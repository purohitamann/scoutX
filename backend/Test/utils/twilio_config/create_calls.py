import requests

# Create Call (POST /call)
response = requests.post(
  "https://api.vapi.ai/call",
  headers={
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd",
    "Content-Type": "application/json"
  },
  json={
    "assistantId": "54c07f4d-e938-4110-8ab7-57bb2f41b1af",
    "name": "ScoutX_API",
    "customers": [
      {
        "number": "+16317686143"
      }
    ],
    "phoneNumberId": "2840de11-bb64-4d66-b58b-b919ec2ac0e4",
    "phoneNumber": {
      "twilioAccountSid": "AC8249b49b775707de422a623d2da30c27",
      "twilioAuthToken": "a59ddef0197ce533de085f11a95f51f1",
      "twilioPhoneNumber": "+19143346292"
    },
    "assistantOverrides": {
      "variableValues": {
        "candidate_name": "Patel Parth",
        "job_name": "Data Scientist",
        "job_description": "A Data Scientist analyzes and interprets complex data to help organizations make data-driven decisions. They use statistical methods, machine learning, and programming skills to uncover trends and patterns in large datasets."
      }
    }
  },
)

print(response.json())