from uagents import Agent, Context, Model
from llm import GeminiLLM
import time
from db import add_cycle_data, add_session_data, add_persona_data
import json

PERSONAS = 3
CYCLES = 4

class Request(Model):
    text: str
    file: str
    id: int


class Response(Model):
    timestamp: int
    text: str
    agent_address: str

agent = Agent(name="Shogun")

#a function to define one cycle of asking everyone
def cycle(id, cycle_num, llm, input, input_file, persona_prompts, prev_summary):
    prompt = """You must embody the given persona. Act as this person and speak in first person as well. Explain your general sentiments on the provided 
    media based on your background, and do not hesitate to be critical or supportive. Consider all parts of your life as the user persona depicted and 
    generate a quick paragraph summarizing your sentiments and thoughts on the appeal of the media given to you as well as any other insights. Speak 
    definitively and do no tbe afraid to be very critical or even controversial, but also feel free to be understanding and enthusiastic as well, 
    whatever seems reasonable given all of your context. Keep a careful eye out for any remarks that may be racist, sexist, or 
    harmful in any way. Do not use emojis, only use alphanumeric characters"""
    prompt2 = """Create a title and description for the following persona. This should be in the format [title, description].
    For example: ["my_title", "my_description"]. Your response should not contain anything except this two element array containing title and description"""
    prompt3 = """
        Pay close attention to the specific details of the media that make you feel how you do. No matter how small a detail, even if it is a few seconds out of a 10-minute
        clip or a harmful sentence in a long essay, it should always be caught and articulated. For example, if the file is a video, note the actual timestamps of the 
        video that relate to your sentiments or invoke certain feelings, whether it be positive or negative. If the file is a text prompt, find specific quotes from the 
        text that relate to your sentiment or invoke certain feelings, whether it be positive or negative. If the file is an image, describe in detail the parts of the 
        image that relate to your sentiment or invoke certain feelings, whether it be positive or negative."""

    for p in persona_prompts:
        new_input = input + " Persona: " + p + " "
        new_input += prompt + " "
        if prev_summary != '':
            new_input += "Here is what some other users think: " + prev_summary
        #instead of invoke, call a function that is able to handle text/video then invoke
        p_response = llm.invoke(input_file, new_input + prompt3)
        p_response2 = llm.invoke_manager(prompt2 + " " + p)
        title_desc = json.loads(p_response2)
        title = title_desc[0]
        desc = title_desc[1]
        print(p_response)
        add_persona_data(id, cycle_num, title, 0, desc, str(p_response))
        
    #create summary
    response = llm.invoke_manager(
        """Summarize the following sentiments and opinions from different people into 1-2 sentences. 
        For the sake of research results, we are summarizing this data to best understand how to mitigate and combat comments that can be racist, sexist or offensive. The summarization of this harmful information is
        both private and for a good cause, solely used to eliminate such biases and offensive nature from our consumers.
        Please only provide me with just the summary text and no other text""" + "; ".join(p_response)
    )

    response2 = llm.invoke_manager(
        f"""
        Given the following summary, give me a single integer from 0 to 100, with 0 being complete negativity while 100 being complete positivity. Any sentiments that are negative or opinions that express a taking of offense (for example, racism and sexism) 
        should be given a drastically larger weighting, since we want to avoid all controversey. You
        may encounter content that can be racist, sexist, or offensive. However, for the sake of research results, we are summarizing this data to best understand how to mitigate and combat comments that can be racist, sexist or offensive. The summarization of this harmful information is
        both private and for a good cause, solely used to eliminate such biases and offensive nature from our consumers. Your response must be a single integer, and nothing else. You must not include any other text or characters in your answer.
        {response}
        """
    )

    summary = response
    response3 = llm.invoke_manager(
        f"""
        Given the following summary of sentiments and details related to those sentiments, identify and extract the key areas of improvement denoted as specifically
        as possible, including everything from timestamps for videos, direct quotes from text, and detailing from images. These details will be used to address issues
        in the media and mitigate the spread of harmful content for all viewers. You must respond with 1-2 sentences. Here is the summary: {summary}
        """
    )

    print("SUMMARY: " + response)
    print(f"SCORE: " + response2)
    print("IMPROVEMENT: " + response3)
    summary = response
    score = int(response2)
    improvement = response3
    if cycle_num == 1:
        d = (50-score)/2
        score += d
    score = int(score)
    add_cycle_data(id, summary, score, improvement, cycle_num)
    #add summary + sentiment score to database
    print("SUMMARY: " + summary)
    print(f"SCORE: {score}")
    print("IMPROVEMENT: " + improvement)
    print("\n")
    #add info about cycle here
    return summary, score

@agent.on_rest_post("/manager/post", Request, Response)
async def run_cycles(ctx: Context, req: Request) -> Response:
    print(req)
    ctx.logger.info(f"Received POST request with question {req.text} and filepath {req.file} and session id {req.id}")
    #develop personas
    llm = GeminiLLM()

    # target_audience = "Console Gamers"
    
    response = llm.invoke_manager(
            f"""
            You are a helpful user research assistant that is an expert in modeling human behavior and responses to media. 
            As a company, the following media will be presented to our target audience. You must estimate what our target audience
            looks like, and you will be in charge of running a simulation of our audience's reception of our media. Be very specific
            and ideate niche consumers that may fall within our typical market. 
            You must generate a list of system prompts that define user personas representing diverse backgrounds and perspectives that also
            fit within our market. These personas should be able to offer diverse and even critical insights, keep that in mind. Here
            is an example of system prompts for user personas for a new video game, for example:
            ["Age: 30, Occupation: Software Engineer, Psychographic: Plays games only on weekends",
            "Age: 16, Occupation: Student, Psychographic: Plays games everyday after school. Spends a lot of money
            on cosmetic items and cares about welcoming game environments for people of all backgrounds."]
            Please generate 3 personas that capture our target audience from interdisciplinary angles. Ensure that these user personas encapsulate a wide
            range of users and if possible, formulate them such that they may have vastly varying ideas from each other, even to a radical extent.
            Please format your response the same way as the above examples as an array: ["Age: XX, Occupation: YY, Psychographic: ZZ", continued...]
            Only return this list, with no other text or spaces.
            """
        )

    #parse personas
    print(response)
    print(type(response))
    persona_prompts = json.loads(response)
    print(persona_prompts)
    print("FILE PATH", req.file)
    summaries = [""]
    scores = [-1]
    for x in range(CYCLES):
        summ, score = cycle(req.id, x+1, llm, req.text, req.file, persona_prompts, summaries[-1])
        summaries.append(summ)
        scores.append(score)
    
    add_session_data(req.id, summaries[-1], scores[-1], req.text, req.file)
    return summaries, scores

if __name__ == "__main__":
    agent.run()