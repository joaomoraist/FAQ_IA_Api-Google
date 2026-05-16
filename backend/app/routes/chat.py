from fastapi import APIRouter

from app.schemas.chat_schema import ChatRequest
from app.services.gemini_service import ask_gemini

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):
    response = ask_gemini(request.question)

    return {"response": response}