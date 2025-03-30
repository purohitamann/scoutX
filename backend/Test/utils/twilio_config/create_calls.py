import requests

# Create Call (POST /call)
response = requests.post(
  "https://api.vapi.ai/call",
  headers={
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd",
    "Content-Type": "application/json"
  },
  json={
    #Here I will add the id from agent_config.py file
    "assistantId": "311481fe-9548-47c4-b41d-f0ab2bd6d945",
    "name": "ScoutX_API",
    "customers": [
      {
        #Phone Number of Candidate
        "number": "+19142788678"
      }
    ],
    #Phone Number Id from twilio_config.py file
    "phoneNumberId": "2840de11-bb64-4d66-b58b-b919ec2ac0e4",
    #Getting Configs from twilio_config.py file
    "phoneNumber": {
      "twilioAccountSid": "AC8249b49b775707de422a623d2da30c27",
      "twilioAuthToken": "a59ddef0197ce533de085f11a95f51f1",
      "twilioPhoneNumber": "+19143346292"
    },
    # Need to make candiate_name and job_name and job description dynamic
    "assistantOverrides": {
      "variableValues": {
        "candidate_name": "Patel Parth",
        "job_name": "Data Scientist",
        "job_description": "A Data Scientist analyzes and interprets complex data to help organizations make data-driven decisions. They use statistical methods, machine learning, and programming skills to uncover trends and patterns in large datasets."
      }
    }
  },
)

# I will need this in id to get the transcript of the call and use it for analysis
print(response['results'][0]['id'])

