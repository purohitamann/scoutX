from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.services.Analyse_services import *
from backend.services.AI_services import *

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class KeywordsInput(BaseModel):
    skill_keywords: dict

class EmailInput(BaseModel):
    to_email: str

class CallInput(BaseModel):
    candidate_name: str
    job_name: str
    job_description: str
    phone_number: str

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
    
@app.post("/create-call/")
def trigger_call(data: CallInput):
    try:
        result = create_call(
            data.candidate_name,
            data.job_name,
            data.job_description,
            data.phone_number
        )
        print(result)
        return {"status": "success", "call_data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
