import requests

response = requests.post(
  "https://api.vapi.ai/tool",
  headers={
    "Authorization": "Bearer b23b37bf-4795-4bcd-993d-401890c569cd",
    "Content-Type": "application/json"
  },
  json={
        "type": "google.calendar.event.create",
        "function": {
            "name": "schedule_job_interview",
            "strict": False,
            "description": "Use this tool to schedule appointments and create calendar events",
            "parameters": {
            "type": "object",
            "properties": {
                "summary": {
                "description": "The title or description of the calendar event",
                "type": "string"
                },
                "timeZone": {
                "description": "The timezone for the event\nAll datetime fields should be provided in ISO 8601 format.",
                "type": "string"
                },
                "endDateTime": {
                "description": "The end date and time of the event",
                "type": "string"
                },
                "startDateTime": {
                "description": "The start date and time of the event\nAll datetime fields should be provided in ISO 8601 format.",
                "type": "string"
                }
            },
            "required": []
            }
        },
        "messages": [],
        "async": False
        }
)

print(response.json())

