import requests

r = requests.post("http://localhost:8000/rest/post", json={ "text": "Tell me a funny story"}, headers={"Content-Type": "application/json"})

print(r)
if r.status_code == 200:
    print(r.text)