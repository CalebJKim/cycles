import yaml
import time
import random

# Define emotional states
EMOTIONAL_STATES = ['happy', 'curious', 'neutral', 'frustrated']

# Load YAML file for personas and media inputs
def load_personas_from_yaml(file_path="personas.yaml"):
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

# Define the Agent class with memory and emotional state
class Agent:
    def __init__(self, name, personality, hobbies, description):
        self.name = name
        self.personality = personality
        self.hobbies = hobbies
        self.description = description
        self.memory = []  # Memory of past interactions
        self.emotional_state = 'neutral'  # Start in a neutral emotional state

    # Generate a reaction based on media type and memory
    def generate_reaction(self, media_type):
        base_reaction = ""
        
        if media_type == "image":
            if "nature" in self.personality:
                base_reaction = f"{self.name} loves the sunset. As a nature enthusiast, they find it breathtaking!"
            elif "tech" in self.personality:
                base_reaction = f"{self.name} wonders about the camera technology used to capture the sunset."
        elif media_type == "video":
            if "animals" in self.hobbies:
                base_reaction = f"{self.name} finds the cat video heartwarming!"
            else:
                base_reaction = f"{self.name} is curious about the cat's behavior in the video."
        elif media_type == "text":
            base_reaction = f"{self.name} is intrigued by the article on AI."

        # Adjust based on emotional state
        if self.emotional_state == "happy":
            return base_reaction + " They are in a good mood, which makes them more positive about the media."
        elif self.emotional_state == "curious":
            return base_reaction + " Their curiosity makes them think deeper about the implications."
        elif self.emotional_state == "frustrated":
            return base_reaction + " However, they feel slightly frustrated, which colors their reaction."

        return base_reaction

    # Update the agent's emotional state dynamically
    def update_emotional_state(self):
        self.emotional_state = random.choice(EMOTIONAL_STATES)

    # Add to memory
    def add_to_memory(self, interaction):
        self.memory.append(interaction)

    # Display memory
    def show_memory(self):
        return f"{self.name}'s Memory: " + ", ".join(self.memory)

# Function for agents to take turns reacting with memory and emotional state
def agents_take_turns_with_memory(media_type, agents):
    for agent in agents:
        # Update emotional state before each interaction
        agent.update_emotional_state()

        # Generate reaction based on current emotional state
        reaction = agent.generate_reaction(media_type)
        print(f"{agent.name} ({agent.personality} - {agent.emotional_state}): {reaction}")
        
        # Add reaction to memory
        agent.add_to_memory(reaction)
        
        # Simulate time delay between agents
        time.sleep(1)

# Start the enhanced chat cycle
def initiate_enhanced_reaction_chat():
    # Load the personas and media inputs from the YAML file
    data = load_personas_from_yaml()
    personas = data['personas']
    media_inputs = data['media_inputs']
    
    # Initialize agent objects
    agents = [Agent(persona['name'], persona['personality'], persona['hobbies'], persona['description']) for persona in personas]
    
    media_type = random.choice(list(media_inputs.keys()))  # Randomly select a media input
    print(f"Media Input: {media_inputs[media_type]}")
    
    # Each agent responds in turn with emotional state and memory
    for i in range(2):  # Simulate two rounds of reaction
        print(f"Round {i + 1}:")
        agents_take_turns_with_memory(media_type, agents)
        print("\n")
    
    # After interactions, display each agent's memory
    for agent in agents:
        print(agent.show_memory())

if __name__ == "__main__":
    initiate_enhanced_reaction_chat()
