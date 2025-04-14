from fastapi import APIRouter
from app.api.routes import analyze, document, news, qna, currency, art, auth

router = APIRouter()

router.include_router(analyze.router, tags=["Scene"])
router.include_router(document.router, tags=["Document"])
router.include_router(news.router, tags=["News"])
router.include_router(qna.router, tags=["Q&A"])
router.include_router(currency.router, tags=["Currency"])
router.include_router(auth.router, tags=["Authentication"])
router.include_router(art.router, tags=["Art Description"])
