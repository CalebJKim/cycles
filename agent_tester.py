import requests
from db import get_session_cycles, start_session

id = start_session()
r = requests.post("http://localhost:8000/manager/post", json={ "text": "Ching Chong! Game on! There is a new Rocket League season upon us! Introducing the elements of fire and water, along with a new Chinese New Year Themed map, Forbidden Temple!", "file": "./uploads/rl_season.jpg", "id": id }, headers={"Content-Type": "application/json"})
cycles = get_session_cycles(id)
print(cycles)
print(r)
if r.status_code == 200:
    print(r.text)