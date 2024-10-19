from uagents import Agent, Context, Model

class Employees(Model):
    employees_data: dict
 
 
class GetEmployees(Model):
    reply_back: bool

def create_fetch_ai_agent(name: str, system_prompt: str, seed: str = None):
    # Create new agent
    agent = Agent(name=name, seed=seed)

    # Store sys prompt as an attribute of the agent
    agent.system_prompt = system_prompt

    # System prompt
    @agent.on_event("startup")
    async def startup(ctx: Context):
        ctx.logger.info(f"Agent {ctx.agent.name} initialized with system prompt: {ctx.agent.system_prompt}")

    # Define a message handler for future conversations
    @agent.on_message(model=Employees, replies=GetEmployees)
    async def handle_message(ctx: Context, sender: str, message: str):
        ctx.logger.info(f"Received message from {sender}: {message}")
        response = f"Agent {ctx.agent.name} acknowledges your message. (System prompt: {ctx.agent.system_prompt})"
        await ctx.send(sender, response)

    return agent

agent1 = create_fetch_ai_agent(
    name="Agent1",
    system_prompt="You are a friendly AI assistant.",
    seed="agent1_seed"
)

agent2 = create_fetch_ai_agent(
    name="Agent2",
    system_prompt="You are a knowledgeable AI assistant specializing in science.",
    seed="agent2_seed"
)

class Message(Model):
    content: str

@agent1.on_message(model=Message)
async def handle_message_agent1(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Agent1 received: {msg.content}")
    response = f"Agent1: Thanks for your message! As a friendly AI, I'd say: {msg.content}"
    await ctx.send(sender, Message(content=response))

@agent2.on_message(model=Message)
async def handle_message_agent2(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Agent2 received: {msg.content}")
    response = f"Agent2: Interesting point! From a scientific perspective, I'd add: {msg.content}"
    await ctx.send(sender, Message(content=response))

# Start the llm arena
@agent1.on_event("startup")
async def start_conversation(ctx: Context):
    await ctx.send(agent2.address, Message(content="Hello Agent2, how are you today?"))

from uagents import Bureau

bureau = Bureau()
bureau.add(agent1)
bureau.add(agent2)

if __name__ == "__main__":
    bureau.run()