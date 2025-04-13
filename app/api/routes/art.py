from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from app.services.groq_vision import describe_image_for_blind
from app.services.groq_tts import generate_tts_audio
from app.utils.file_handler import save_upload_file_tmp, delete_file, delete_file_after_delay

router = APIRouter()

@router.post("/art")
async def analyze_scene(
    background_tasks: BackgroundTasks,
    image: UploadFile = File(...)
):
    # Save the image to temp location
    image_path = await save_upload_file_tmp(image)

    description = describe_image_for_blind(image_path, "analyze-art")

    audio_path = generate_tts_audio(description)

    # Schedule deletion of temp files
    background_tasks.add_task(delete_file, image_path)
    background_tasks.add_task(delete_file_after_delay, audio_path)

    return {
        "description": description,
        "audio_path": f"/static/{audio_path}"
    }
