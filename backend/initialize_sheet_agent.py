import json
from composio_crewai import Action, ComposioToolSet
from crewai import Agent, Crew, Task, Process
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from crewai_tools.tools.base_tool import BaseTool
from firebase.init import db
import os

load_dotenv()
llm = ChatOpenAI(model="gpt-4o")
from firebase.init import update_spreadsheet_id
# get_user_by_username


def createSheet(entityId: str):
    username = entityId

    def get_user_by_username(username):
        users_ref = db.collection('users')
        query = users_ref.where('username', '==', username).limit(1)
        docs = query.get()

        for doc in docs:
            return doc.to_dict()

        return False

    user = get_user_by_username(entityId)
    keywords = user['sheetsConfig']['keywords']
    attributes = user['sheetsConfig']['attributes']
    sheetTitle = user['sheetsConfig']['sheetTitle']
    email = user['email']
    composio_toolset = ComposioToolSet(
        api_key=os.environ.get("COMPOSIO_API_KEY"), entity_id=entityId)

    class UpdateSpreadsheetId(BaseTool):
        name: str = "Update Spreadsheet ID in the database"
        description: str = "This tool updates the spreadsheet_id for a user in the database"

        def _run(self, username: str, spreadsheet_id: str) -> str:
            success = update_spreadsheet_id(username, spreadsheet_id)
            if success:
                return "Spreadsheet ID updated successfully"
            else:
                return "Failed to update Spreadsheet ID"

    update_spreadsheet_id_tool = UpdateSpreadsheetId()

    google_tools = composio_toolset.get_actions(actions=[
        Action.GOOGLESHEETS_CREATE_GOOGLE_SHEET1,
        Action.GOOGLESHEETS_BATCH_UPDATE,
        Action.GMAIL_SEND_EMAIL
    ])
    google_tools.append(update_spreadsheet_id_tool)

    google_assistant = Agent(
        role="Gmail Assistant",
        goal= """
        1. Create a Google Sheet and update it with provided values
        2. Update the spreadsheet_id in the database.
        3. Send an email to the user with specified subject and body.
        """,
        backstory=
        "You're an AI assistant that handles Google Sheets & Gmail operations using Google APIs.",
        verbose=True,
        llm=llm,
        tools=google_tools,
        allow_delegation=False,
    )

    create_google_sheet = Task(
        description=f"""
        1. Create a new Google Sheet titled '{sheetTitle}', batch update it with the following values starting in row 1 ie from A1: {attributes} (if more than one, then update in the next column ex: A2, A3...),
        2. Do not use includeValuesInResponse attribute. 
        3. Update the spreadsheet_id in the database for user with username: {username}
        4. Send an email with recipient_email as: {email}, with subject {keywords} and body with dummy values for the following attributes: {attributes}. dont specify anything else apart from recipient_email, subject, body while sending email.
        """,
        agent=google_assistant,
        expected_output=
        "Create sheet, store values, update spreadsheet_id in the database, send an email to the user",
    )

    gmail_processing_crew = Crew(
        agents=[google_assistant],
        tasks=[create_google_sheet],
        verbose=1,
        process=Process.sequential,
    )
    return gmail_processing_crew.kickoff()
