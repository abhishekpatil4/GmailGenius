# ⚡️GmailGenius: Supercharge your Gmail
*Automatically processes new emails, extracts data from attachments, and organizes everything in a spreadsheet!*

## Why GmailGenius?

I developed GmailGenius because managing invoices felt like trying to find a needle in a haystack—while blindfolded! I was constantly losing track of due dates and getting hit with late fees, which turned my financial life into a chaotic mess. So, I thought, why not create an AI buddy to handle the email chaos? With GmailGenius, users can connect their Gmail, specify keywords, and let the AI scan for invoices, extracting all the important details straight into Google Sheets. I built the AI agents using CrewAI, which allowed me to create specialized agents tailored for this task. The real magic comes from [Composio (https://app.composio.dev)’s powerful [Gmail](https://app.composio.dev/app/gmail) and [Google sheets](https://app.composio.dev/app/googlesheets) tools, which made integrating these features a breeze—just plug and play! Thanks to Composio, I could focus on creating a seamless user experience while my AI genius does the heavy lifting. Now you can say goodbye to late fees and hello to a more organized inbox!

#### Checkout how others are using GmailGenius:
[![Open in Dev.to](https://img.shields.io/badge/Open%20in-Dev.to-green?logo=dev.to&style=for-the-badge)](https://dev.to/composiodev/i-built-an-ai-tool-to-handle-my-moms-invoices-and-saved-her-20-hours-of-work-44h1)
[![Open in Reddit](https://img.shields.io/badge/Open%20in-Reddit-blue?logo=reddit&style=for-the-badge)](https://www.reddit.com/r/selfhosted/comments/1f7f8f4/i_built_an_ai_tool_to_handle_my_moms_invoices_and/)

## Demo
### Check it out on Replit
[![Open in Replit](https://img.shields.io/badge/Open%20in-Replit-blue?logo=replit&style=for-the-badge)](https://replit.com/@abishkpatil/gmail-assistant-fb)

### Live Demo ([Live Link](https://gmail-assistant-six.vercel.app/))
[![gmailgenius-demo](https://github.com/user-attachments/assets/abb24495-d242-42f3-8cff-599182f735f4)](https://drive.google.com/file/d/1_CWZ3yNK4pxe8Ey1bnQq4C6H_lEHDICb/preview)

## Description
GmailGenius simplifies the process of finding relevant emails, downloading attachments, and extracting key data. Here's how it works:

1. **Sign up on GmailGenius** and link your Gmail account and Google Sheet
2. **Enter keywords** you want the AI agent to look for in your email
3. **GmailGenius finds emails and attachments** from Gmail that match your keyword criteria
4. **Useful information from the attachments is extracted and stored** in your linked Google Sheet.

### Under the hood, the AI agent divides the task into multiple steps and executes them:

<img width="1664" alt="Screenshot 2024-09-02 at 12 53 53 AM" src="https://github.com/user-attachments/assets/07d51b40-dbd1-4406-9a28-942a4c1e6f86">

1. **Retrieves emails from Gmail** that match the keyword/phrase criteria.
2. **Downloads** the relevant attachments.
3. **Extracts useful attributes** from the email body & attachments.
4. **Stores** the extracted data in the linked Google Sheet.

## Tech Stack
- Frontend: ReactJS, Vite, TailwindCSS
- Backend: Python, FastAPI
- AI Agent: CrewAI, Composio, OpenAI
- Composio tools: [Gmail](https://app.composio.dev/app/gmail), [Google Sheets](https://app.composio.dev/app/googlesheets)

## Run Locally
### Setup tutorial
[![gmailgenius-demo](https://github.com/user-attachments/assets/abb24495-d242-42f3-8cff-599182f735f4)](https://drive.google.com/file/d/1kC9oVSUatqQ6Tcs3u6CTsVsmczzG-F6k/preview)

Clone the project

```bash
  git clone https://github.com/ComposioHQ/cookbook.git
```

Go to the project directory

```bash
  cd gmail-assistant/gmail-assistant-firebase
```

### Backend

Go to backend dir & run setup script, this will create a virtual environment & download necessary libraries (Note: if you're unable to execute then grant permisson -> chmod +x setup.sh)
You'll then be prompted to login to **Composio**, link **Gmail** & **Google Sheets**. 
Add API keys in **.env file**

```bash
  cd backend && ./setup.sh
```

Start the server

```bash
  python main.py
```

Start the agent

```bash
  python agent.py
```

### Frontend

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Composio Login
If you're prompted to login & enter API key, run the below command to login

```bash
  composio login
```

You'll be redirected to composio website, login, get the API key and paste it
  
