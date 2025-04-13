from fastapi import APIRouter

router = APIRouter()

@router.post("/news")
async def question_answering():
    return {"Hello world"}