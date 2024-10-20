import requests
from llm import GeminiLLM
import dotenv
import os
dotenv.load_dotenv()
import time

class Agent:
    def __init__(self, name, system_prompt, agent_id):
        self.llm = GeminiLLM()
        self.name = name
        self.system_prompt = system_prompt
        self.agent_id = agent_id

    def process_message(self, filepath, prompt):
        response = self.llm.invoke(filepath, self.system_prompt + "\n\nUser: " + prompt)
        return response

def create_agent(name, system_prompt):
    """
    Creates a new agent in the agentverse for Fetch.ai.

    Args:
    name (str): The name of the agent.
    system_prompt (str): The system prompt for the agent.

    Returns:
    Agent: A new Agent object.
    """
    # Define the API endpoint
    url = "https://agentverse.ai/v1/hosting/agents"
    token = os.getenv("FETCH_AI_API_KEY")
    # Define the headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"""Bearer {token}"""
    }

    # Define the payload
    payload = {
        "name": name,
        "description": f"An agent named {name} for Fetch.ai",
        "goal": "To assist users with Fetch.ai related queries",
        "instructions": system_prompt,
        "allow_file_uploads": True,
    }

    response = requests.post(url, json=payload, headers=headers).json()
    address = response['address']
    print(f'Agent Address : {address}')

    start_response = requests.post(f"https://agentverse.ai/v1/hosting/agents/{address}/start", headers={"Authorization": f"""Bearer {token}"""})
    print(start_response)
    time.sleep(10)


agent = create_agent("FetchBot", "You are a helpful assistant for Fetch.ai.")

if agent:
    user_message = "What is Fetch.ai?"
    response = agent.process_message("car_soccer.jpg", user_message)
    print(f"Agent response: {response}")