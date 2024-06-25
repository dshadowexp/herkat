from fastapi import APIRouter

router = APIRouter(
    prefix="/match"
)

@router.post("")
def matching():
    return {"message": "You have been matched to..."}

