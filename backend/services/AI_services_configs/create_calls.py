
def get_creat_call_payload(candidate_name, job_name, job_description, phone_number):
    
  json={
      #Here I will add the id from agent_config.py file
      "assistantId": "5a5c8aa0-649f-4de6-9630-728e12275da3",
      "name": "ScoutX_API",
      "customers": [
        {
          #Phone Number of Candidate
          "number": f"{phone_number}"
        }
      ],
      
      "phoneNumberId": "2840de11-bb64-4d66-b58b-b919ec2ac0e4",
      "phoneNumber": {
        "twilioAccountSid": "AC8249b49b775707de422a623d2da30c27",
        "twilioAuthToken": "a59ddef0197ce533de085f11a95f51f1",
        "twilioPhoneNumber": "+19143346292"
      },
      # Need to make candiate_name and job_name and job description dynamics
      "assistantOverrides": {
        "variableValues": {
          "candidate_name": f"{candidate_name}",
          "job_name": f"{job_name}",
          "job_description": f"{job_description}"
        }
      }
    }
  return json
