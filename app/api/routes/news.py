from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import JSONResponse
from app.utils.file_handler import delete_file_after_delay
from app.services.groq_chat import  get_indian_news
from app.services.groq_tts import generate_tts_audio

router = APIRouter()

@router.get("/news")
async def question_answering(background_tasks: BackgroundTasks):
    
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
    
    response = {
        "audio_path": f"/static/{audio_path}",
        "news_summary": news_summary,
        "message": "News summary generated successfully",
        "status": "success"
    }
        
    background_tasks.add_task(delete_file_after_delay, audio_path)
    return JSONResponse(status_code=200, content=response)
    