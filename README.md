# AutoShield AI

AutoShield AI is a full-stack web application that uses AI to review source code and help developers understand possible problems in their code.

It checks uploaded code for bugs, security issues, performance problems, code quality, and improvement suggestions. The project also includes user authentication, review history, AI-generated interview questions, interview history, user profiles, and PDF reports.

## Live Demo

https://autoshield-ai-chetan.onrender.com

## Features

- AI-powered code review
- Bug and error detection
- Code quality analysis
- Security and performance suggestions
- AI-generated interview questions
- User registration and login
- JWT authentication
- Review history
- Interview question history
- User profile
- PDF report download
- Responsive user interface

## Tech Stack

**Frontend:** React.js, Vite, JavaScript, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB, MongoDB Atlas

**AI:** Groq API

**Authentication:** JWT

**Other Tools:** Multer, jsPDF, Git, GitHub, Render

## Supported Files

- Java
- JavaScript
- Python
- C
- C++

## Project Structure

The project has two main parts:

- frontend - React application and user interface
- backend - Express server, APIs, authentication, database, and AI integration

## Installation

Clone the repository:

```bash
git clone https://github.com/Chets-25/AI_PoweredCodeReviwSystem.git
```

Go to the project folder:

```bash
cd AI_PoweredCodeReviwSystem
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a .env file inside the backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
```

Do not upload the .env file to GitHub.

## Run Locally

Start the backend:

```bash
cd backend
npm run dev
```

The backend runs on:

http://localhost:8080

Open another terminal and start the frontend:

```bash
cd frontend
npm run dev
```

The frontend usually runs on:

http://localhost:5173

## Deployment

The project is deployed using Render.

- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas
- AI: Groq API

## Author

**Chetan Rakhade**

GitHub: https://github.com/Chets-25
