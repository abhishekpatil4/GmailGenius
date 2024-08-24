import os
from datetime import datetime
from crewai_tools.tools.base_tool import BaseTool
from composio_crewai import App, ComposioToolSet
from crewai import Agent, Task, Crew
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from typing import Dict
import requests
import json
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", verbose=True, temperature=0.5, google_api_key="AIzaSyCOWneGBRvrjtM4wwcL5bj1HPIOyxAG9Jg")

def read_counter():
    if not os.path.exists("counter.txt"):
        return 0
    with open("counter.txt", "r") as f:
        return int(f.read() or 0)

def write_counter():
    current_value = read_counter()
    new_value = current_value + 1
    with open("counter.txt", "w") as f:
        f.write(str(new_value))

class ExtractorTool(BaseTool):
    name: str = "Document Data Extractor"
    description: str = "This tool extracts useful data from a document"

    def _run(self) -> Dict[str, any]:
        local_path = "./invoice.pdf"
        url = os.getenv("NANO_URL")
        auth = requests.auth.HTTPBasicAuth(os.getenv("NANO_API_KEY"), '')
        files = {'file': open(local_path, 'rb')}

        try:
            response = requests.post(url, auth=auth, files=files)
            response.raise_for_status() 
            return json.loads(response.text)["result"][0]["prediction"]
        except requests.exceptions.RequestException as e:
            print(f"Error occurred while processing the document: {e}")
            return {}

# Define tools for the agents
composio_toolset = ComposioToolSet()
gmail_tools = composio_toolset.get_tools(apps=[App.GMAIL])
googlesheets_tools = composio_toolset.get_tools(apps=[App.GOOGLESHEETS])
Data_Extractor = ExtractorTool()
tools = gmail_tools + googlesheets_tools + [Data_Extractor]

def run_crew(emailKeywords: str, attributes: str, sheetId: str):
    try:
        gmail_agent = Agent(
            role="Gmail and Google Sheets Integration Agent",
            goal="""Efficiently process emails in Gmail, extract specific information from attachments, and organize data in Google Sheets. You will use Gmail and Google Sheets APIs to automate these tasks.""",
            backstory = f'''You are an AI agent designed to streamline email processing and data management for users. Your primary functions are:
            1. Search for specific emails in Gmail based on user-defined keywords (e.g., sender, subject, date range, email body).
            2. Download attachments from identified emails to ./attachments directory with name {read_counter()}
            3. Extract relevant information from various types of attachments (e.g., PDFs, spreadsheets, text files).
            4. Organize and store extracted data in specified Google Sheets. ''',
            verbose=True,
            tools=tools,
            cache=False,
        )
        task = Task(
            description=f"""
            1. Search Gmail:
            - Keywords: {emailKeywords}
            - Label: INBOX
            - Limit search to recent emails (e.g., last 7 days)

            2. Process found email(s):
            - Download attachment(s) to ./attachments directory with name {read_counter()}
            - Identify attachment type (PDF, spreadsheet, etc.)

            3. Extract information:
            - From attachment(s) in ./attachments directory with name {read_counter()}, extract the following attributes: {attributes}
            - If multiple matching emails found, process the most recent one

            4. Store in Google Sheets:
            - Sheet ID: {sheetId}
            - Starting cell: A{read_counter()}
            - Format: Each attribute in a separate column

            5. Error handling:
            - If no matching email found, report back
            - If attachment can't be processed, log the error and continue

            6. Confirmation:
            - After successful storage, confirm the number of attributes stored and their location in the sheet
            """,
            agent=gmail_agent,
            expected_output=f"Successfully extracted and stored {len(attributes)} attributes in Google Sheet (ID: {sheetId}) starting from cell A{read_counter()}. Ready for next task."
        )
        crew = Crew(agents=[gmail_agent], tasks=[task], llm=llm, verbose=1)
        result = crew.kickoff()
        write_counter()
        return result, 200  
    except Exception as e:
        print(f"Error in run_crew: {e}")
        return str(e), 500  


run_crew("Invoice from abishkpatil@gmail.com, Apple TV", "invoice amount, invoice date", "1UEzR3FG9Jk6Vl_2RvTgHJuDbuzZXHDMl6yAIX3NDwJU")