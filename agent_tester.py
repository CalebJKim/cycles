import requests

requests.post("http://localhost:8000/rest/post", json={ "text": "hello"}, headers={"Content-Type": "application/json"})