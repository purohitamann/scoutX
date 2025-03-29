import requests

call_id = "00e56551-6849-48f3-8aed-e097d54f4ec6"
# Use f-string for proper variable insertion
url = f"https://api.vapi.ai/call/{call_id}"

# Corrected headers formatting
headers = {
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd"
}

# Make the request
response = requests.get(url, headers=headers)

# Check for a successful response before printing JSON
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}, {response.text}")
