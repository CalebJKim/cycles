import google.generativeai as genai
import os
import time
import dotenv
from PIL import Image
from pathlib import Path
from typing import Union, List
from google.generativeai.types import HarmCategory, HarmBlockThreshold

class GeminiLLM:
    def __init__(self, model_name="gemini-1.5-pro-latest"):
        dotenv.load_dotenv()
        self.api_key = os.getenv("GEMINI_API_KEY")
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(model_name)

    def determine_file_type(self, filepath):
        # Extract the file extension
        file_extension = Path(filepath).suffix.lower()

        # Define the known extensions for video, image, and text files
        video_extensions = {'.mp4', '.mkv', '.avi', '.mov', '.flv', '.wmv'}
        image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.svg'}
        text_extensions = {'.txt', '.csv', '.json', '.xml', '.md', '.log'}

        # Check file type based on the extension
        if file_extension in video_extensions:
            return "video"
        elif file_extension in image_extensions:
            return "image"
        elif file_extension in text_extensions:
            return "text"
        else:
            return "unknown"
    
    def format_content(self, filepath, prompt):
        file_type = self.determine_file_type(filepath)
        
        if file_type == "video":
            video_file = genai.upload_file(filepath)
            while video_file.state.name == "PROCESSING":
                print('.', end='')
                time.sleep(10)
                video_file = genai.get_file(video_file.name)
            
            if video_file.state.name == "FAILED":
                raise ValueError(video_file.state.name)
            
            return [prompt, video_file]

        elif file_type == "image":
            image = genai.upload_file(filepath)
            return [prompt, image]
        
        elif file_type == "text":
            with open(filepath, "r"):
                text = filepath.read()
                return [prompt, text]
        
        else:
            raise ValueError("file type not identified")

    def invoke_manager(self, prompt):
        generation_config = genai.types.GenerationConfig(
            candidate_count=1,
            temperature=0.3,
        )
        
        if isinstance(prompt, str):
            response = self.model.generate_content(prompt,
                                                   safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            },
             generation_config=generation_config)
        elif isinstance(prompt, list):
            response = self.model.generate_content(prompt, 
                                                   safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            },
            generation_config=generation_config)
        else:
            raise ValueError("Invalid prompt type. Must be a string or a list of strings and images / videos.")

        return response.text



    def invoke(self, filepath, prompt):
        generation_config = genai.types.GenerationConfig(
            candidate_count=1,
            temperature=0.2,
        )

        formatted_prompt = self.format_content(filepath, prompt)

        if isinstance(formatted_prompt, str):
            response = self.model.generate_content(formatted_prompt, safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            },
             generation_config=generation_config)
        elif isinstance(formatted_prompt, list):
            response = self.model.generate_content(formatted_prompt, safety_settings={
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            },
            generation_config=generation_config)
        else:
            raise ValueError("Invalid prompt type. Must be a string or a list of strings and images / videos.")

        return response.text
    
# Usage example
if __name__ == "__main__":
    llm = GeminiLLM()