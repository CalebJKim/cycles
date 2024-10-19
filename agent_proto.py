import time
import requests
import dotenv
import os

dotenv.load_dotenv()

# Load API token from environment
token = f'Bearer {os.getenv("FETCH_AI_API_KEY")}'

def create_and_start_agent(agent_name, agent_code):
    # Create payload for agent creation request
    agent_creation_data = {"name": agent_name}
    
    # Send POST request to create the agent
    response_agent = requests.post(
        "https://agentverse.ai/v1/hosting/agents", 
        json=agent_creation_data, 
        headers={"Authorization": token}
    ).json()
    
    # Get the agent address
    address = response_agent.get('address')
    
    if not address:
        raise Exception(f"Error creating agent: {response_agent}")
    
    print(f'Agent Address: {address}')
    
    # Prepare the code data to upload to the agent
    agent_code_data = {"code": agent_code}
    
    # Upload the agent code to the created agent
    response_code_update = requests.put(
        f"https://agentverse.ai/v1/hosting/agents/{address}/code", 
        json=agent_code_data, 
        headers={"Authorization": token}
    )
    
    if response_code_update.status_code != 200:
        raise Exception(f"Error uploading code to agent: {response_code_update.json()}")
    
    # Start the agent
    requests.post(f"https://agentverse.ai/v1/hosting/agents/{address}/start", headers={"Authorization": token})
    
    # Wait for a few seconds to allow the agent to start
    time.sleep(10)
    
    return address

def get_agent_response(agent_address, prompt):
    """
    Get the agent's response to a prompt.
    
    :param agent_address: The address of the agent
    :param prompt: The prompt to send to the agent
    :return: The response from the agent
    """
    # Prepare the payload with the prompt
    prompt_data = {"input": prompt}
    
    # Send POST request to the agent's endpoint with the prompt
    response = requests.post(
        f"https://agentverse.ai/v1/hosting/agents/{agent_address}/execute",
        json=prompt_data,
        headers={"Authorization": token}
    )
    
    if response.status_code != 200:
        raise Exception(f"Error getting response from agent: {response.json()}")
    
    # Return the agent's response
    return response.json().get("output", "No response from the agent")
