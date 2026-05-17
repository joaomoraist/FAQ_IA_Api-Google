import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash-lite")

with open("app/data/faq.txt", "r", encoding="utf-8") as f:
    faq_content = f.read()

def ask_gemini(question: str):

    prompt = f"""
    Você é um assistente FAQ e tem objetivo de responder as perguntas dos usuários usando as informações contidas na FAQ abaixo.

    Responda apenas usando as informações abaixo, exclusivamente.
    Seja curto e objetivo, mas sempre responda a informação completa. Caso não saiba a resposta, diga que não sabe e que orienta procurar no Google.

    FAQ:
    {faq_content}

    Pergunta:
    {question}
    """

    response = model.generate_content(prompt)

    return response.text
