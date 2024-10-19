# Cycles (name in progress)

## Tech Stack/Frameworks
+ React
+ Bootstrap
+ React Router
+ Flask
+ SingleStore
+ Fetch.AI
+ more things

## Installing Dependencies

### Create a virtual environment inside the cycles folder

```python -m venv venv```

### Activate the virtual environment

Windows:
```venv\scripts\activate```

Mac/Linux:
```source ./venv/bin/activate```

### Install Back End requirements
```pip install -r requirements.txt```

### Install Front End requirements
cd into the web-app folder, then run
```npm i```

## Starting the webserver

Note you will have to have different windows

Start the backend (inside the cycles folder):
```python app.py```

Start the frontend (inside the web-app folder):
```npm start```