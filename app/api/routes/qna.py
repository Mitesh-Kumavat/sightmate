from fastapi import APIRouter

router = APIRouter()

@router.post("/qna")
async def question_answering():
    return {"Hello world"}