import requests
from prompt import SYSTEM_PROMPT

response = requests.post(
  "https://api.vapi.ai/assistant",
  headers={
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd",
    "Content-Type": "application/json"
  },
  json={
    "name": "ScoutX_API",
    "voice": {
        "voiceId": "Elliot",
        "provider": "vapi",
        "inputPunctuationBoundaries": [
        "،",
        "?",
        "."
        ]
    },
    "model": {
        "model": "gemini-1.5-flash",
        "messages": [
        {
            "role": "system",
            "content":SYSTEM_PROMPT        
        }
        ],
        "provider": "google",
        "temperature": 1.0,
        "emotionRecognitionEnabled": True
    },
    "firstMessage": "Hi {{candidate_name}}, Emily from Scotiabank here. Are you available for a quick call to discuss your {{job_name}} application?",
    "voicemailMessage": "Please call back when you're available.",
    "endCallFunctionEnabled": True,
    "endCallMessage": "Thanks again for your time, {{candidate_name}}!We’ll be in touch soon with next steps. Wishing you a fantastic day ahead!",
    "transcriber": {
        "model": "nova-3",
        "language": "en",
        "numerals": True,
        "provider": "deepgram",
        "endpointing": 300
    },
    "clientMessages": [
        "transcript",
        "hang",
        "function-call",
        "speech-update",
        "metadata",
        "transfer-update",
        "conversation-update",
        "workflow.node.started"
    ],
    "serverMessages": [
        "end-of-call-report",
        "status-update",
        "hang",
        "function-call"
    ],
    "hipaaEnabled": False,
    "backgroundSound": "office",
    "backchannelingEnabled": True,
    "analysisPlan": {
        "summaryPrompt": "You are an expert note-taker for an HR call analysis AI. Your role is to accurately and comprehensively document every detail of the conversation between the HR agent and the candidate. Capture key points such as the candidate's background, skills, experience, communication style, and overall demeanor. Note any relevant responses to role-specific questions, including strengths, weaknesses, and career goals. Additionally, document subtle cues such as tone, confidence level, and enthusiasm, as these are valuable for evaluating the candidate’s alignment with the job requirements. Your detailed notes will be used for further analysis to assess the candidate's fit for the role and support the decision-making process."
    },
    "backgroundDenoisingEnabled": True,
    "messagePlan": {
        "idleMessages": [
        "Feel free to ask me any questions."
        ]
    },
    "startSpeakingPlan": {
        "waitSeconds": 0.2,
        "smartEndpointingEnabled": "livekit",
        "smartEndpointingPlan": {
        "provider": "livekit",
        "waitFunction": "70 + 3000 * x"
        }
    },
    "stopSpeakingPlan": {
        "numWords": 2
    }
}

)
print(response['results'][0]['id'])