from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from auth_sync import AuthSync

app = FastAPI(title="AuthSync API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

auth = AuthSync()

TEMP_IMAGE_PATH = "temp_image.jpg"


@app.get("/")
def home():
    return {"message": "AuthSync API is running!"}


@app.post("/register")
async def register_voter(
    name: str = Form(...),
    image: UploadFile = File(...)
):
    with open(TEMP_IMAGE_PATH, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    result = auth.register(name, TEMP_IMAGE_PATH)

    if os.path.exists(TEMP_IMAGE_PATH):
        os.remove(TEMP_IMAGE_PATH)

    return result


@app.post("/verify")
async def verify_voter(image: UploadFile = File(...)):
    with open(TEMP_IMAGE_PATH, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    result = auth.verify(TEMP_IMAGE_PATH)

    if os.path.exists(TEMP_IMAGE_PATH):
        os.remove(TEMP_IMAGE_PATH)

    return result


@app.get("/voters")
def get_voters():
    return auth.get_all_voters()

@app.delete("/clear-voters")
def clear_voters():
    return auth.clear_voters()