from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from config.firebase_init import auth 
from entity import createNewEntity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, can be a list of specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

def verify_token(auth_credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    token = auth_credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# Pydantic model for the request body
class UserData(BaseModel):
    username: str
    appType: str

@app.post("/newentity")
async def handle_request(user_data: UserData, decoded_token: dict = Depends(verify_token)):
    user_id = decoded_token['uid']
    username = user_data.username
    appType = user_data.appType
    res = createNewEntity(username, appType)
    return res

# Start the server (if running locally)
# Run the following command in your terminal: uvicorn main2:app --reload
