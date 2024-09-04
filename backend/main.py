from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from firebase.init import auth
from composio_config import createNewEntity, isEntityConnected, enable_gmail_trigger
import logging
from initialize_sheet_agent import createSheet

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"
                   ],  # Allows all origins, can be a list of specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


def verify_token(auth_credentials: HTTPAuthorizationCredentials = Depends(
    HTTPBearer())):
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

class NewEntityData(BaseModel):
    username: str
    appType: str
    redirectUrl: str

@app.post("/newentity")
async def handle_request(user_data: NewEntityData,
                         decoded_token: dict = Depends(verify_token)):
    user_id = decoded_token['uid']
    username = user_data.username
    appType = user_data.appType
    redirectUrl = user_data.redirectUrl
    res = createNewEntity(username, appType, redirectUrl)
    return res


class EnableTriggerData(BaseModel):
    username: str


@app.post("/enabletrigger")
async def handle_request(user_data: EnableTriggerData,
                         decoded_token: dict = Depends(verify_token)):
    user_id = decoded_token['uid']
    username = user_data.username
    res = enable_gmail_trigger(username)
    return res


@app.post("/checkconnection")
async def handle_request(user_data: UserData,
                         decoded_token: dict = Depends(verify_token)):
    user_id = decoded_token['uid']
    username = user_data.username
    appType = user_data.appType
    res = isEntityConnected(username, appType)
    return res


class UserData(BaseModel):
    username: str


@app.post("/createsheet")
async def handle_request(user_data: UserData,
                         decoded_token: dict = Depends(verify_token)):
    username = user_data.username
    res = createSheet(username)
    return res


@app.get("/")
async def handle_request():
    return "ok"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Start the server (if running locally)
# Run the following command in your terminal: uvicorn main:app --reload
