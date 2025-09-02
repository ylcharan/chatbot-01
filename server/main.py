from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key="##")


class UserMessage(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/chat")
async def chat(user_msg: UserMessage):
    response = client.chat.completions.create(
    model="gpt-4o-mini",   # or gpt-4.1, gpt-3.5-turbo, etc.
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_msg.message}
    ]
)
    return {"reply": response.choices[0].message.content}