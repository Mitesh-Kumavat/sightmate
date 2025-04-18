from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.groq_chat import  get_indian_news
from app.services.groq_tts import generate_tts_audio

router = APIRouter()

@router.get("/news")
async def question_answering():
    
    news_summary = get_indian_news()
    
    if not news_summary:
        return JSONResponse(status_code=500, content={"message": "Error summarizing news"})
    
    audio_path = generate_tts_audio(news_summary)
    
    if not audio_path:
        return JSONResponse(status_code=500, content={
            "message": "Error generating TTS audio, but still returning news summary",
            "status": "error",
            "news_summary": news_summary
        })
    
    return JSONResponse(status_code=200, content={
        "audio_path": audio_path,
        "news_summary": news_summary,
        "message": "News summary generated successfully",
        "status": "success"
    })
    