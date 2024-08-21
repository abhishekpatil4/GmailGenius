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
llm = ChatOpenAI(model="gpt-4o")

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

def run_crew(emailKeywords: str, attributes: str):
    try:
        gmail_agent = Agent(
            role="Google Agent",
            goal="""You take action on Gmail using Gmail APIs & you can extract useful information from documents and store them into an google sheets""",
            backstory="""You are an AI agent responsible for taking actions on Google\'s gmail and sheets on users' behalf. 
            You need to take action on Gmail using Gmail's APIs. Use correct tools to run APIs from the given tool-set, extract attributes from documents and Store them in google sheets""",
            verbose=True,
            tools=tools,
            llm=llm,
            cache=False,
        )
        task = Task(
            description=f"Look for an email with keywords {emailKeywords}. Get the email attachment and store the following attributes in sheets: {attributes}",
            agent=gmail_agent,
            expected_output="Store the {attributes} in sheets",
        )
        crew = Crew(agents=[gmail_agent], tasks=[task])
        result = crew.kickoff()
        return result, 200  
    except Exception as e:
        print(f"Error in run_crew: {e}")
        return str(e), 500  