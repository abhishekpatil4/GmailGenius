import os
import re
import glob
import json
from composio.client.collections import TriggerEventData
from composio_crewai import Action, ComposioToolSet
from crewai import Agent, Crew, Task, Process
from crewai_tools.tools.base_tool import BaseTool
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from typing import Any, Dict
import requests
from firebase.init import update_row
from firebase.init import db
# get_user_by_username
from pathlib import Path

load_dotenv()

llm = ChatOpenAI(model="gpt-4o")


class incrementCounter(BaseTool):
    name: str = "Increment Counter"
    description: str = "This tool increments the counter value for a user"

    def _run(self, uid: str, current_row: str) -> bool:
        new_row = int(current_row) + 1
        success = update_row(uid, str(new_row))
        if success:
            return f"Counter incremented. New row value: {new_row}"
        else:
            return "Failed to increment counter"


# # Get the attachment that was recently downloaded
# def get_recent_attachment() -> str:
#     pdf_files = glob.glob(os.path.join("/Users/abhishekpatil/.composio/output/", "*.pdf")) # modify path as per need
#     if not pdf_files:
#         return None

#     most_recent_pdf = max(pdf_files, key=os.path.getctime)
#     return most_recent_pdf


# Extract useful attributes from attachment
class extractorTool(BaseTool):
    name: str = "ExtractorTool"
    description: str = "This tool extracts useful attributes from pdf document/attachments"

    def _run(self, file_path: str) -> Dict[str, Any]:
        url = os.environ.get("NANO_URL")
        FilePath = {'file': open(file_path, 'rb')}
        response = requests.post(url,
                                 auth=requests.auth.HTTPBasicAuth(
                                     os.environ.get("NANO_API_KEY"), ''),
                                 files=FilePath)
        return json.loads(response.text)["result"][0]["prediction"]


# Trigger instance
composio_toolset1 = ComposioToolSet(api_key=os.environ.get("COMPOSIO_API_KEY"))
listener = composio_toolset1.create_trigger_listener()


@listener.callback(filters={"trigger_name": "GMAIL_NEW_GMAIL_MESSAGE"})
def callback_new_message(event: TriggerEventData) -> None:
    print("Received new email")
    payload = event.payload

    def get_user_by_username(username):
        users_ref = db.collection('users')
        query = users_ref.where('username', '==', username).limit(1)
        docs = query.get()

        for doc in docs:
            return doc.to_dict()

        return False

    user = get_user_by_username(event.metadata.connection.clientUniqueUserId)
    keywords = user['sheetsConfig']['keywords']
    attributes = user['sheetsConfig']['attributes']
    sheetId = user['sheetsConfig']['spreadsheet_id']
    sheetName = "Sheet1"
    row = user['sheetsConfig']['row']
    uid = user['uid']
    # Tools
    composio_toolset = ComposioToolSet(
        api_key=os.environ.get("COMPOSIO_API_KEY"),
        output_dir=Path.cwd() / "attachments",
        entity_id=event.metadata.connection.clientUniqueUserId)
    tools = composio_toolset.get_actions(actions=[
        Action.GMAIL_GET_ATTACHMENT, Action.GOOGLESHEETS_BATCH_UPDATE
    ]) + [extractorTool(), incrementCounter()]

    # Agent
    google_assistant = Agent(
        role="Google Assistant",
        goal=
        "Process emails, check for keywords, download attachments, extract attributes, and store in Google Sheets",
        backstory=
        "You're an AI assistant that processes emails, extracts information from attachments, and stores data in Google Sheets.",
        verbose=True,
        llm=llm,
        tools=tools,
        allow_delegation=False,
    )

    process_new_email = Task(
        description=f"""
        1. Check if the email subject (subject) or body (messageText) in the payload contains any of these keywords: {keywords}, Payload: {payload}.
        2. If keywords match, download the attachment using the GMAIL_GET_ATTACHMENT action.
        3. Use the Extractor_tool, pass the file path of the downloaded attachment to extract content from it
        4. From the extracted content, identify the following attributes: {attributes}.
        5. Store the identified attributes in Google Sheet with ID {sheetId}, sheet name {sheetName}, in cell A{row}. Just add the attribute value and not the attribute name. Do not use includeValuesInResponse attribute.
        6. Increment the row counter, if and only if you updated the Google Sheet otherwise do not increment the row counter. Use the IncrementCounter tool, pass the uid value: {uid} and current row value: {row} as arguments.
        """,
        agent=google_assistant,
        expected_output=
        "Summary of email processing, including whether keywords matched, attachment was processed, and data was stored in the Google Sheet.",
    )

    email_processing_crew = Crew(
        agents=[google_assistant],
        tasks=[process_new_email],
        verbose=1,
        process=Process.sequential,
    )
    result = email_processing_crew.kickoff()
    return result


print("Email trigger listener activated!")
listener.listen()
