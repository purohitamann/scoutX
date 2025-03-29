from vapi import Vapi

client = Vapi(
    token="b23b37bf-4795-4bcd-993d-401890c569cd",
)

print(client.assistants.create())
