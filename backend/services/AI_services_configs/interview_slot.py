
def get_inetrview_slot_payload():
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
  return json
