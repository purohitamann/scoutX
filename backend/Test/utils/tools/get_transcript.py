import requests

call_id = "54c07f4d-e938-4110-8ab7-57bb2f41b1af" 
response = requests.get(
  "https://api.vapi.ai/call/{call_id}",
  headers={
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd"
  },
)

print(response.json())