# Marketmind

MarketMind is an AI-powered human-interaction-simulation platform that generates diverse, realistic user personas based on demographic data, psychographics, and behavioral patterns of a company’s target market. The platform simulates the release of proposed content in multimodal input formats to these personas (including video, text, audio, and images / art), generating reactions and predicting evolving sentiments over time. It then models how these opinions spread and change over time through multiple “cycles” of people interacting and sharing their thoughts, dynamically processing this data into real-time visualizations and insights. The platform provides real-time analytics and insights on public sentiment based on the simulation cycles, allowing companies to identify potential issues or polarizing content in their media, subsequently making data-driven decisions before release.

## How it is built
We built MarketMind by utilizing **Google Gemini** to use consumer and market data to generate interdisciplinary and diverse user personas, then integrated **Fetch AI** to generate distinct agents representing each user person with specialized instructions and system prompts in the agentverse. We choose to use Gemini because it is an expert at finding “needles in a haystack,” meaning it would be able to identify controversial or biased points that many humans may miss (https://cloud.google.com/blog/products/ai-machine-learning/the-needle-in-the-haystack-test-and-how-gemini-pro-solves-it). An arbiter agent exposes multimedia of any form (text, video, audio, image) to the “users” in the agentverse and facilitates productive conversation while monitoring individual as well as overall shifts in sentiment and reception of the media, highlighting any potential points of controversy or caution. This data is processed through a **SingleStore** database, which performs sophisticated analytics in real-time to display visualizations, crucial summaries, as well as metrics on agent conversation in real-time until we observe a convergence in public opinion towards a more unified sentiment. We use semantic scores to rate the media based on these agent-agent interactions, giving companies a definite benchmark to work with / improve as well as model human psychographics as closely as possible. We then created a frontend to display the data and interactions using **React** and **Typescript** as well as **Recharts** for cleaner, dynamic visualizations.

![image](https://github.com/user-attachments/assets/59206b7f-16ff-4514-a17a-51be44dfeb29)


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

## Set Environment variables

Please put the following in a .env:

SINGLE_STORE_USER=[single store user]

SINGLE_STORE_PASSWORD=[single store password]

FETCH_API_KEY=[api key from fetch's agentverse]

GEMINI_API_KEY=[api key from Google AI Studio]

## Starting the server

Note you will have to have 3 different windows for this to work properly

Start the backend (inside the main folder (marketmind or whatever it is named)):
```python app.py```

and also start the manager agent:
```python manager_agent.py```

Start the frontend (inside the web-app folder):
```npm start```
