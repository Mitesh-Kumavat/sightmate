import os
from tempfile import NamedTemporaryFile
from fastapi import UploadFile
import asyncio

async def save_upload_file_tmp(upload_file: UploadFile) -> str:
    suffix = os.path.splitext(upload_file.filename)[-1]
    with NamedTemporaryFile(delete=False, suffix=suffix, dir="tmp") as tmp:
        tmp.write(await upload_file.read())
        return tmp.name

def delete_file(path: str):
    try:
        os.remove(path)
    except Exception as e:
        
        print(f"Failed to delete file {path}: {e}")

async def delete_file_after_delay(file_path: str, delay_seconds: int = 150):
    await asyncio.sleep(delay_seconds)
    if os.path.exists("static/"+ file_path):
        try:
            os.remove("static/"+ file_path)
        except FileNotFoundError:
            pass 