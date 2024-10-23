import yaml
import autogen
from autogen import browser
import random
import time

# Load the YAML file for personas and media inputs
def load_personas_from_yaml(file_path="personas.yaml"):
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

# Function to search the web for a given topic and return the context
def search_web_for_context(query):
    try:
        print(f"Searching the web for: {query}")
        search_results = browser.search(query)
        if search_results:
            # Select multiple results to retrieve more comprehensive context
            context = browser.mclick([result["id"] for result in search_results[:3]])
            return context
        else:
            return "No relevant web results found."
    except Exception as e:
        return f"Error during search: {str(e)}"

# Generate reaction for an agent based on persona, media type, and additional context from the web
def generate_reaction_with_context(media_type, agent, context):
    reaction = ""
    if media_type == "image":
        if "nature" in agent['personality']:
            reaction = f"{agent['name']} is captivated by the sunset and discusses how nature is often depicted in photography. {context}"
        elif "tech" in agent['personality']:
            reaction = f"{agent['name']} wonders about the camera technology used in capturing sunsets. {context}"
        else:
            reaction = f"{agent['name']} enjoys the image and starts thinking about its symbolic meaning. {context}"
    
    elif media_type == "video":
        if "animals" in agent['hobbies']:
            reaction = f"{agent['name']} finds the video of the cat playing adorable. {context}"
        else:
            reaction = f"{agent['name']} is curious about the video and wonders about the psychology of cats. {context}"

    elif media_type == "text":
        if "AI" in media_inputs["text"]:
            reaction = f"{agent['name']} dives into the future of AI, exploring its possibilities in society. {context}"
        else:
            reaction = f"{agent['name']} reflects deeply on the text and its implications. {context}"

    return reaction

# Function for agents to take turns reacting to media with web context
def agents_take_turns_with_context(media_type, personas):
    for agent in personas:
        # Search the web for relevant context for each agent's reaction
        query = f"{agent['name']} reaction to {media_type}"
        context = search_web_for_context(query)
        reaction = generate_reaction_with_context(media_type, agent, context)
        print(f"{agent['name']} ({agent['personality']}): {reaction}")
        time.sleep(1)  # Simulate time delay between agent turns

# Start the chat cycle using autogen's initiate_chats
def initiate_reaction_chat_with_web():
    # Load the personas and media inputs from the YAML file
    data = load_personas_from_yaml()
    personas = data['personas']
    media_inputs = data['media_inputs']
    
    media_type = random.choice(list(media_inputs.keys()))  # Randomly select a media input
    print(f"Media Input: {media_inputs[media_type]}")
    
    # Each agent responds in turn with additional web context
    for i in range(2):  # Simulate two rounds of reactions
        print(f"Round {i + 1}:")
        agents_take_turns_with_context(media_type, personas)
        print("\n")  # Space between rounds

if __name__ == "__main__":
    initiate_reaction_chat_with_web()
