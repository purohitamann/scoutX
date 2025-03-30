import requests
from backend.services.AI_services_configs.agent_config import *
from backend.services.AI_services_configs.create_calls import *
from backend.services.AI_services_configs.interview_slot import *
API_KEY = "Bearer b23b37bf-4795-4bcd-993d-401890c569cd"
HEADERS = {
    "Authorization": API_KEY,
    "Content-Type": "application/json"
}

def create_agent():
    url = "https://api.vapi.ai/assistant"
    payload = get_agent_payload()
    res = requests.post(url, headers=HEADERS, json=payload)
    return res.json()


def create_call(candidate_name, job_name, job_description, phone_number):
    url = "https://api.vapi.ai/call"
    payload = get_creat_call_payload(candidate_name, job_name, job_description, phone_number)
    res = requests.post(url, headers=HEADERS, json=payload)
    return res.json()


def create_interview_tool():
    url = "https://api.vapi.ai/tool"
    payload = get_inetrview_slot_payload()
    res = requests.post(url, headers=HEADERS, json=payload)
    return res.json()
