import google.generativeai as genai
import os
import dotenv

class GeminiLLM:
    def __init__(self, model_name="gemini-1.5-flash"):
        dotenv.load_dotenv()
        self.api_key = os.getenv("GEMINI_API_KEY")
        
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(model_name)

    def invoke(self, prompt):
        response = self.model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                candidate_count=1,
                temperature=0.2,
            ),
        )
        return response.text

# Usage example
if __name__ == "__main__":
    llm = GeminiLLM()
    result = llm.invoke("Write a story about a magic backpack.")
    print(result)