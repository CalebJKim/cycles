import requests

r = requests.post("http://localhost:8000/manager/post", json={ "text": "Ching Chong!! There is a new Rocket League season upon us! Introducing the elements of fire and water, along with a new Chinese New Year Themed map, Forbidden Temple!", "file": "./uploads/rl_season.jpg" }, headers={"Content-Type": "application/json"})

print(r)
if r.status_code == 200:
    print(r.text)