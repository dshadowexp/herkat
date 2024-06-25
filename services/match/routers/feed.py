from fastapi import APIRouter


router = APIRouter(
    prefix="/feed"
)

@router.post("")
def inject_feed():
    return { "message": "feed inject" }