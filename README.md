# AutoShield AI

AutoShield AI is a full-stack web application that uses AI to review source code and provide useful feedback to developers.

It can analyze uploaded code for bugs, code quality, security issues, performance problems, and improvement suggestions. The project also includes authentication, review history, interview question generation, user profiles, and PDF reports.

## Live Demo

https://autoshield-ai-chetan.onrender.com

## Features

- AI-powered code review
- Bug and error detection
- Code quality analysis
- Security and performance suggestions
- AI-generated interview questions
- User registration and login
- Review history
- User profile
- PDF report download

## Tech Stack

**Frontend:** React.js, Vite, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB

**AI:** Google Gemini API

**Authentication:** JWT

**Other Tools:** Multer, jsPDF, Git, GitHub, Render

## Project Structure

AutoShield AI is divided into two main parts:

- `frontend` - React application and user interface
- `backend` - Express server, APIs, authentication, database, and AI integration

## Installation

Clone the repository:

`git clone https://github.com/Chets-25/AI_PoweredCodeReviwSystem.git`

Install backend dependencies:

`cd backend`

`npm install`

Install frontend dependencies:

`cd frontend`

`npm install`

## Environment Variables

Create a `.env` file inside the `backend` folder and add:

`MONGO_URI=your_mongodb_connection_string`

`GEMINI_API_KEY=your_gemini_api_key`

`JWT_SECRET=your_jwt_secret`

## Run Locally

Start the backend:

`cd backend`

`npm run dev`

Start the frontend in another terminal:

`cd frontend`

`npm run dev`

## Author

Chetan Rakhade

GitHub: https://github.com/Chets-25
