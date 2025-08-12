import os
from groq import Groq
from uuid import uuid4

client = Groq(api_key='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')

def generate_tts_audio(text: str) -> str:
    try:
        speech_file_name = f"{uuid4().hex}.wav"
        speech_file_path = os.path.join("static", speech_file_name)

        response = client.audio.speech.create(
            model="playai-tts",
            voice="Fritz-PlayAI",
            input=text,
            response_format="wav"
        )
        response.write_to_file(speech_file_path)

        return speech_file_name
    except Exception as e:
        print(f"Error generating TTS audio: {e}")
        return None
