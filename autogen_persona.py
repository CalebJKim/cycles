import yaml
import time
import random

# Load YAML file for personas and media inputs
def load_personas_from_yaml(file_path="personas.yaml"):
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

# Generate reaction based on persona, media type, and context
def generate_reaction(media_type, agent):
    if media_type == "image":
        return f"{agent['name']} loves the beautiful sunset! As a {agent['personality']}, they always see beauty in nature."
    elif media_type == "video":
        if "animals" in agent['hobbies']:
            return f"{agent['name']} finds the cat video super adorable and can't stop watching it!"
        else:
            return f"{agent['name']} is intrigued by the playful behavior of the cat."
    elif media_type == "text":
        if "AI" in media_type:
            return f"{agent['name']} is fascinated by the discussion of AI and its societal implications."
        else:
            return f"{agent['name']} reflects deeply on the article."
    return f"{agent['name']} reacts thoughtfully to the media input."

# Function for agents to take turns reacting
def agents_take_turns(media_type, personas):
    for agent in personas:
        reaction = generate_reaction(media_type, agent)
        print(f"{agent['name']} ({agent['personality']}): {reaction}")
        time.sleep(1)  # Add some delay to simulate time-based interaction

# Start the chat cycle
def initiate_reaction_chat():
    # Load the personas and media inputs from the YAML file
    data = load_personas_from_yaml()
    personas = data['personas']
    media_inputs = data['media_inputs']

    media_type = random.choice(list(media_inputs.keys()))  # Randomly choose a media input
    print(f"Media Input: {media_inputs[media_type]}")
    
    # Each agent responds in turn
    for i in range(2):  # Simulate two rounds of reaction
        print(f"Round {i + 1}:")
        agents_take_turns(media_type, personas)
        print("\n")

if __name__ == "__main__":
    initiate_reaction_chat()
