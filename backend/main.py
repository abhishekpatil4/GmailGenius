from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_crew
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class Message(BaseModel):
    emailKeywords: str
    attributes: str

@app.post("/fetch")
async def fetch(message: Message):
    try:
        logger.info(f"Received request with emailKeywords: {message.emailKeywords} and attributes: {message.attributes}")
        result, status_code = run_crew(message.emailKeywords, message.attributes)
        
        logger.info(f"Agent result: {result}")
        return {"result": result}
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)