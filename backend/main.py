from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.services.Analyse_services import *

app = FastAPI()

class KeywordsInput(BaseModel):
    skill_keywords: dict

class EmailInput(BaseModel):
    to_email: str

@app.get("/transcript/{call_id}")
def get_transcript(call_id: str):
    try:
        transcript = fetch_transcript_from_vapi(call_id)
        return {"status": "success", "transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/keyword-match/")
def get_keyword_scores(data: KeywordsInput):
    try:
        result = keyword_match_score(data.skill_keywords)
        return {"match_scores": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/analyze/")
def analyze():
    try:
        return analyze_candidate_with_ai()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send-email/")
def send_email(data: EmailInput):
    try:
        return send_feedback_email(data.to_email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
