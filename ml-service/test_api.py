import json
import requests

with open("test_request.json", "r") as f:
    payload = json.load(f)

response = requests.post("http://127.0.0.1:8000/predict", json=payload)

print("Status code:", response.status_code)
print("Response JSON:", response.json())