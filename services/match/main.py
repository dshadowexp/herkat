from fastapi import FastAPI

from routers.feed import router as feed_router
from routers.match import router as match_router

app = FastAPI()

app.include_router(feed_router)
app.include_router(match_router)

@app.get("/")
async def root():
    return {"message": "hello from fast api match"}