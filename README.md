
# ⚡️GmailGenius: Supercharge your Gmail
*Effortlessly find emails, extract data from attachments, and organize it in a spreadsheet*

## Demo
[![Watch on Loom](https://img.shields.io/badge/Watch%20on-Loom-brightgreen?logo=loom&style=for-the-badge)](https://www.loom.com/embed/c1ff7adf304d47259f71fae09e5f738c?sid=2d11ef56-1fed-4c1d-86b4-1cb4dc449a43)
[![Screenshot 2024-08-21 at 11 21 19 PM](https://github.com/user-attachments/assets/ab1c9158-2c2e-4ccb-8a3f-bf35a7899c21)](https://www.loom.com/embed/c1ff7adf304d47259f71fae09e5f738c?sid=2d11ef56-1fed-4c1d-86b4-1cb4dc449a43)

## Description
GmailGenius simplifies the process of finding relevant emails, downloading attachments, and extracting key data. Here's how it works:

<img src="https://github.com/user-attachments/assets/4930cbcb-3427-48e1-8e54-9d78c769b619" alt="gmailgenius" width="600" />


1. **Sign up on GmailGenius** and link your Gmail account and Google Sheet.
2. **Enter keywords** you want to search for in your Gmail.
3. **GmailGenius finds emails and attachments** from Gmail that match your keyword criteria.
4. **Useful information from the attachments is extracted and stored** in your linked Google Sheet.

### Under the hood, the AI agent divides the task into multiple steps and executes them:

1. **Retrieves emails from Gmail** that match the keyword/phrase criteria.
2. **Downloads** the relevant attachments.
3. **Extracts useful attributes** from the attachments using Nanonets.
4. **Stores** the extracted data in the linked Google Sheet

## Tech Stack
- Frontend: ReactJS, Vite, TailwindCSS
- Backend: Python, FastAPI
- AI Agent: CrewAI, Composio, OpenAI


## Run Locally

Clone the project

```bash
  git clone https://github.com/abhishekpatil4/GmailGenius.git
```

Go to the project directory

```bash
  cd GmailGenius
```

### Backend

Go to backend dir & run setup script, this will create a virtual environment & download necessary libraries (Note: if you're unable to execute then grant permisson -> chmod +x setup.sh)
You'll then be prompted to login to **Composio**, link **Gmail** & **Goole Sheets**. 
Add API keys in **.env file**

```bash
  cd backend && ./setup.sh
```

Start the server

```bash
  python main.py
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
  
