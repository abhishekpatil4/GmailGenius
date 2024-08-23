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

load_dotenv()

llm = ChatOpenAI(model="gpt-4o")

def get_recent_attachment() -> str:
    pdf_files = glob.glob(os.path.join("/Users/abhishekpatil/.composio/output/", "*.pdf")) #modify path as per need
    if not pdf_files:
        return None  
    
    most_recent_pdf = max(pdf_files, key=os.path.getctime)
    return most_recent_pdf

class extractorTool(BaseTool):
    name: str = "ExtractorTool"
    description: str = "This tool extracts useful attributes from pdf document/attachments"

    def _run(self) -> Dict[str, Any]:
        attachment = get_recent_attachment()
        url = os.environ.get("NANO_URL")
        FilePath = {'file': open(attachment, 'rb')}
        response = requests.post(url, auth=requests.auth.HTTPBasicAuth(os.environ.get("NANO_API_KEY"), ''), files=FilePath)
        return json.loads(response.text)["result"][0]["prediction"]


Extractor_tool=extractorTool()
composio_toolset = ComposioToolSet()
gmail_tools = composio_toolset.get_actions(
    actions=[
        # Action.GMAIL_FETCH_MESSAGE_BY_THREAD_ID,
        Action.GMAIL_GET_ATTACHMENT,
        Action.GMAIL_FETCH_EMAILS
    ]
)
tools = gmail_tools + [Extractor_tool]

gmail_assistant = Agent(
    role="Gmail Assistant",
    # goal="""Find emails/messages using thread id, download attachments & extract attributes/information from it""",
    goal="""Get recent 5 emails/messages and check if thread id matches, download attachments & extract attributes/information from it""",
    backstory=f"""You're an AI assistant that makes use of google_tools/APIs and does work on behalf of user. You can extract attributes/information from attachments""",
    verbose=True,
    llm=llm,
    tools=tools,
    allow_delegation=False,
)

listener = composio_toolset.create_trigger_listener()

@listener.callback(filters={"trigger_name": "GMAIL_NEW_GMAIL_MESSAGE"})
def callback_new_message(event: TriggerEventData) -> None:
    print("Received email")
    payload = event.payload
    thread_id = payload.get("threadId")
    keywords = "Invoice, Apple TV"
    attributes = "Invoice date, invoice number, invoice amount, currency"
    
    # Correct the description by concatenating strings
    find_invoice_from_gmail = Task(
        description=f"""
        Find emails with thread id {thread_id}, check if it contains keywords like {keywords}, if so then extract attachment id & attachment name associated with that email and download the attachment & display the following attributes: {attributes} 
        """,
        agent=gmail_assistant,
        expected_output="If email matches criteria ({keywords}) then download attachment & display attributes, otherwise indicate email isnt related",
    )

    gmail_processing_crew = Crew(
        agents=[gmail_assistant],
        tasks=[find_invoice_from_gmail],
        verbose=1,
        process=Process.sequential,
    )
    result = gmail_processing_crew.kickoff()
    return result


print("Subscription created!")
listener.listen()