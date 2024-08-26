from composio import ComposioToolSet, App
from composio.client.exceptions import NoItemsFound

def createNewEntity(ent_id: str, appType: str):
    toolset = ComposioToolSet(entity_id=ent_id)
    entity = toolset.get_entity()
    app_enum = getattr(App, appType)
    try:
        entity.get_connection(app=app_enum)
        response = {
            "authenticated": "yes",
            "message": f"User {ent_id} is already authenticated with {appType}",
            "url": ""
        }
        return response

    except NoItemsFound as e:
        # Create a request to initiate connection
        request = entity.initiate_connection(app_enum, redirect_url="http://localhost:5173/settings")
        response = {
            "authenticated": "no",
            "message": f"User {ent_id} is not yet authenticated with {appType}. Please authenticate.",
            "url": request.redirectUrl
        }
        return response
        # Poll until the connection is active
        connected_account = request.wait_until_active(client=toolset.client, timeout=100)
    