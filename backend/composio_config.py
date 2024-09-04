from composio import ComposioToolSet, App, Composio, Action
from composio.client.exceptions import NoItemsFound
from firebase.init import db
import os
from dotenv import load_dotenv
load_dotenv()

def update_gmail_trigger_status(ent_id: str) -> bool:
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', ent_id).limit(1)
    docs = query.get()

    for doc in docs:
        try:
            doc.reference.update({'gmailTriggerEnabled': True})
            return True
        except Exception as e:
            print(f"Error updating trigger status: {e}")
            return False

    print(f"User with entity id {ent_id} not found")
    return False


def enable_gmail_trigger(ent_id: str):
    client = Composio()
    try:
        entity = client.get_entity(id=ent_id)
        trigger_config = {'userId': 'me', 'interval': 1, 'labelIds': 'INBOX'}
        trigger_name = 'GMAIL_NEW_GMAIL_MESSAGE'

        entity.enable_trigger(app=App.GMAIL,
                              trigger_name=trigger_name,
                              config=trigger_config)

        response = {
            "status": "success",
            "message": f"Trigger {trigger_name} enabled for {ent_id} on Gmail"
        }

        if update_gmail_trigger_status(ent_id):
            return response
        else:
            return {
                "status":
                "partial_success",
                "message":
                f"Trigger enabled, but failed to update user status for {ent_id}"
            }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to enable trigger: {str(e)}"
        }


def isEntityConnected(ent_id: str, appType: str):
    toolset = ComposioToolSet(api_key=os.environ.get("COMPOSIO_API_KEY"),
                              entity_id=ent_id)
    entity = toolset.get_entity()
    app_enum = getattr(App, appType)
    try:
        entity.get_connection(app=app_enum)
        response = {
            "authenticated": "yes",
            "message": f"User {ent_id} is authenticated with {appType}",
        }
        return response
    except NoItemsFound as e:
        response = {
            "authenticated": "no",
            "message": f"User {ent_id} is not authenticated with {appType}",
        }
        return response


def createNewEntity(ent_id: str, appType: str, redirectUrl: str):
    toolset = ComposioToolSet(api_key=os.environ.get("COMPOSIO_API_KEY"),
                              entity_id=ent_id)
    entity = toolset.get_entity()
    app_enum = getattr(App, appType)
    try:
        entity.get_connection(app=app_enum)
        response = {
            "authenticated": "yes",
            "message":
            f"User {ent_id} is already authenticated with {appType}",
            "url": ""
        }
        return response

    except NoItemsFound as e:
        # Create a request to initiate connection
        request = entity.initiate_connection(
            app_enum,
            redirect_url=redirectUrl)
        response = {
            "authenticated": "no",
            "message":
            f"User {ent_id} is not yet authenticated with {appType}. Please authenticate.",
            "url": request.redirectUrl
        }
        return response
        # Poll until the connection is active
        connected_account = request.wait_until_active(client=toolset.client,
                                                      timeout=100)

