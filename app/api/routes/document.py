from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi import status

from app.services.groq_vision import describe_image_for_blind
from app.services.groq_tts import generate_tts_audio
from app.utils.file_handler import save_upload_file_tmp, delete_file, delete_file_after_delay

router = APIRouter()

@router.post("/document")
async def analyze_scene(
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...)
):
    try:
        image_path = await save_upload_file_tmp(image)

        description = describe_image_for_blind(image_path, "analyze-document")

        background_tasks.add_task(delete_file, image_path)

        if not description:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "status": "error",
                    "message": "Max GROQ API limits reached.",
                    "description": "Max GROQ API limits reached.",
                    "audio_path": None,
                },
            )

        audio_path = generate_tts_audio(description)

        if not audio_path:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={
                    "status": "error",
                    "message": "TTS failed due to rate limits. Please try again.",
                    "description": description,
                    "audio_path": None,
                },
            )

        background_tasks.add_task(delete_file_after_delay, audio_path)

    except Exception as e:
        background_tasks.add_task(delete_file, image_path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "message": "Failed to process image.",
                "description": str(e),
                "audio_path": None,
            },
        )

    return {
        "status": "success",
        "message": "Image processed successfully.",
        "description": description,
        "audio_path": f"/static/{audio_path}"
    }
