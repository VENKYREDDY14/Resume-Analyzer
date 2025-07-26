# Resume Analyzer with Gemini AI

This is a full-stack web application that allows users to upload their resumes (PDF format, max size 5MB) and get them analyzed using **Gemini AI**. The app validates file uploads on both frontend and backend, supports single/multi-row resumes, and provides a user-friendly interface with toast notifications.

---

## 🌟 Features

- Upload PDF resumes (max 5MB)
- Gemini AI integration for resume analysis
- React frontend with real-time toast notifications
- Backend using Node.js and Express
- File validation with Multer middleware
- Clear error handling for invalid files
- Responsive and easy-to-use UI

---

## 📁 Project Structure
```
resume-analyzer/
├── backend/
│   ├── controllers/
│   │   └── resumeController.js
│   ├── db/
│   │   ├── index.js
│   │   └── config.js
│   ├── middleware/
│   │   └── multer.js
│   ├── models/
│   │   └── Resume.js
│   ├── routes/
│   │   └── resumeRoutes.js
│   ├── services/
│   │   └── analysisService.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── screenshots/
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── App.js
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── ResumeUploader.js
│       │   ├── ResumeAnalysis.js
│       │   └── PastResumesTable.js
│       ├── context/
│       │   └── TabContext.js
│       └── pages/
│           ├── ResumeAnalysis.js
│           ├── ResumeHistory.js
│           └── NotFound.js
└── README.md

```


---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- A Gemini AI API key

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/VENKYREDDY14/Resume-Analyzer.git
cd Resume-Analyzer

2. Setup Backend
cd backend
npm install

Create a .env file in /backend with:
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=Reddy@****
DB_PORT=5432
DB_DATABASE=resume_db
GEMINI_API_KEY=AIzaSyBVukwY-a7hsLXOe*****

Start the backend server:
npm start

3. Setup Frontend
cd ../frontend
npm install

Create a .env file in /frontend with:
REACT_APP_BACKEND_URL


Start the frontend development server:
npm start

Gemini AI Integration
The backend integrates with the Gemini AI API.

Uploaded PDF resumes are parsed and the extracted text is sent to Gemini.

Gemini analyzes the content and returns insights, which are displayed in the frontend.

File Upload Rules
Only .pdf files are allowed

Max file size: 5 MB

Invalid file uploads are blocked with meaningful error messages

Screenshots
### Upload Resume Page
![Upload Page](./frontend/screenshots/Screenshot from 2025-07-25 14-28-01.png/)
![Upload Page](./frontend/screenshots/Screenshot from 2025-07-25 14-28-30.png/)
![Upload Page](./frontend/screenshots/Screenshot from 2025-07-25 14-28-58.png/)

### Resume Analysis Result
![Result Page](./frontend/screenshots/Screenshot from 2025-07-25 14-29-01.png/)
![Result Page](./frontend/screenshots/Screenshot from 2025-07-25 14-29-07.png/)

Live URL:
https://resume-analyzer-nine-rosy.vercel.app/
