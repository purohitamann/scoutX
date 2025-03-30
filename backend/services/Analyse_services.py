import requests
import json
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TRANSCRIPT_DATA = {"text": None} #global
ANALYSIS_RESULT = {}

def fetch_transcript_from_vapi(call_id):
    url = f"https://api.vapi.ai/call/{call_id}"
    headers = {"Authorization": "Bearer "} # token

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        transcript = response.json().get("transcript", "")
        TRANSCRIPT_DATA["text"] = transcript
        return transcript
    else:
        raise Exception("Failed to fetch transcript")

def keyword_match_score(skill_keywords):
    transcript = TRANSCRIPT_DATA.get("text")
    if not transcript:
        raise Exception("Transcript not loaded")

    scores = {}
    transcript_lower = transcript.lower()
    for skill, keywords in skill_keywords.items():
        count = sum(1 for kw in keywords if kw.lower() in transcript_lower)
        scores[skill] = min(count, 5)
    return scores

def analyze_candidate_with_ai():
    transcript = TRANSCRIPT_DATA.get("text")
    if not transcript:
        raise Exception("Transcript not loaded")

    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Authorization": "Bearer ", #ppx token
        "Content-Type": "application/json"
    }

    prompt = f"""
You are an AI HR screening assistant.

Your task is to analyze the following User interview transcript and return a structured evaluation.

STRICT INSTRUCTION:
- ONLY return valid JSON.
- DO NOT include markdown (no ```json or ```).
- DO NOT include any explanation, commentary, or extra text.
- ONLY respond with the JSON object as shown below.

{{"candidate_name": "Name of the candidate","candidate_summary": "A concise summary of the candidate's background and performance.","criteria_scores": {{"Communication Skills": <1-5>,"Relevant Experience": <1-5>,"Technical Knowledge": <1-5>,"Cultural Fit": <1-5>,"Enthusiasm / Motivation": <1-5>,"English Fluency": <1-5>}}, "strengths": "Key strengths observed in the conversation.", "weaknesses": "Notable weaknesses or concerns.", "sentiment_confidence_analysis": "Analyze the candidate’s tone, confidence, and energy during the conversation.", "ai_recommendation": "Final recommendation with fit level (Strong Fit, Moderate Fit, Weak Fit) and justification."}}

Here is the transcript:
\"\"\"{transcript}\"\"\"
"""

    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "You are an AI agent that analyzes interview transcripts for HR purposes."},
            {"role": "user", "content": prompt.strip()}
        ],
        "temperature": 0.3,
        "top_p": 1.0
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        json_str = re.sub(r"```json|```", "", content).strip()  #parse json
        result = json.loads(json_str)

        ANALYSIS_RESULT.update(result)
        return result
    
    except Exception as e:
        print("Error occurred during API call or JSON parsing:", e)
        return None


def send_feedback_email(to_email):
    analysis = ANALYSIS_RESULT
    if not analysis:
        raise Exception("Run analysis first")

    sender_email = "" # email
    sender_password = ""#   passkey

    name = analysis["candidate_name"]
    feedback_summary = analysis["candidate_summary"] + "\n\nAI Recommendation: " + analysis["ai_recommendation"]

    subject = "VoiceHire Interview Feedback - Thank You!"
    body = f"""
Hi {name},

Thanks again for taking the time to chat with us! It was great learning more about your background and experiences.

As part of our process, we use an AI-assisted tool to generate a short summary of the interview. Here’s what it came up with:

{feedback_summary}

We really appreciate your interest in the position and the insights you shared. If you have any questions or want to chat further, feel free to reach out.

Wishing you all the best with your job search!

Warm regards,  
VoiceHire Team

"""

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, message.as_string())
        server.quit()
        return {"status": "success", "to": to_email}
    except Exception as e:
        return {"status": "Failed to send email", "to": to_email}
    