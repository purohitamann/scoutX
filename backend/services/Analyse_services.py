
import requests
import json
import re

def keyword_match_score(transcript, skill_keywords):
    scores = {}
    transcript_lower = transcript.lower()
    
    for skill, keywords in skill_keywords.items():
        count = sum(1 for kw in keywords if kw.lower() in transcript_lower)
        score = min(count, 5)  
        scores[skill] = score
    return scores

# skill_keywords = {
#     "Technical Skills": ["python", "machine learning", "deep learning", "tensorflow", "nlp"],
#     "Relevant Experience": ["internship", "project", "industry", "real-world", "hands-on"],
#     "Communication Skills": ["team", "communicate", "collaborate", "discussion", "presentation"]
# }
def analyze_candidate(transcript_text):
    """
    Analyze an interview transcript using Perplexity's Sonar Pro model.
    Returns structured candidate evaluation as JSON.
    """

    url = "https://api.perplexity.ai/chat/completions"  
    headers = {
        "Authorization": f"Bearer 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",
        "Content-Type": "application/json"
    }

    prompt = f"""
You are an AI HR screening assistant.

Your task is to analyze the following candidate interview transcript and return a structured evaluation.

STRICT INSTRUCTION:
- ONLY return valid JSON.
- DO NOT include markdown (no ```json or ```).
- DO NOT include any explanation, commentary, or extra text.
- ONLY respond with the JSON object as shown below.

Use the following JSON format exactly:

{{
  "candidate_summary": "A concise summary of the candidate's background and performance.",
  "criteria_scores": {{
    "Communication Skills": <1-5>,
    "Relevant Experience": <1-5>,
    "Technical Knowledge": <1-5>,
    "Cultural Fit": <1-5>,
    "Enthusiasm / Motivation": <1-5>,
    "English Fluency": <1-5>
  }},
  "strengths": "Key strengths observed in the conversation.",
  "weaknesses": "Notable weaknesses or concerns.",
  "sentiment_confidence_analysis": "Analyze the candidate’s tone, confidence, and energy during the conversation.",
  "ai_recommendation": "Final recommendation with fit level (Strong Fit, Moderate Fit, Weak Fit) and justification."
}}

Here is the transcript:
\"\"\"
{transcript_text}
\"\"\"
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

        # Clean and parse the JSON output
        json_str = re.sub(r"```json|```", "", content).strip()
        result = json.loads(json_str)
        # result=json_str


        return result

    except Exception as e:
        print("Error occurred during API call or JSON parsing:", e)
        return None

