import google.generativeai as genai
import os
import time
import dotenv
from PIL import Image
# import cv2
from typing import Union, List
import vertexai
from vertexai.generative_models import GenerativeModel, Part

class GeminiLLM:
    def __init__(self, model_name="gemini-1.5-pro-latest"):
        dotenv.load_dotenv()
        self.api_key = os.getenv("GEMINI_API_KEY")
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(model_name)

    def invoke(self, prompt: Union[str, List[Union[str, Image.Image]]]):
        generation_config = genai.types.GenerationConfig(
            candidate_count=1,
            temperature=0.2,
        )

        if isinstance(prompt, str):
            response = self.model.generate_content(prompt, generation_config=generation_config)
        elif isinstance(prompt, list):
            response = self.model.generate_content(prompt, generation_config=generation_config)
        else:
            raise ValueError("Invalid prompt type. Must be a string or a list of strings and images.")

        return response.text

# Usage example
if __name__ == "__main__":
    llm = GeminiLLM()
    
    # # Text-only prompt
    # text_result = llm.invoke("Write a story about a magic backpack.")
    # print("Text-only result:", text_result)

    # Multimodal prompt with text and image
    # image = Image.open("car_soccer.jpg")
    # multimodal_result = llm.invoke([
    #     "Describe this image in detail:",
    #     image
    # ])
    # print("Multimodal result:", multimodal_result)

    # video_capture = cv2.VideoCapture('rl_clip.mov')


    # vertexai.init(project=PROJECT_ID, location="us-central1")

    video_file = genai.upload_file("rl_clip.mov")
    while video_file.state.name == "PROCESSING":
        print('.', end='')
        time.sleep(10)
        video_file = genai.get_file(video_file.name)
    
    if video_file.state.name == "FAILED":
        raise ValueError(video_file.state.name)

    response = llm.invoke([
        "describe what happens in this video.",
        video_file
    ])

    print(response)