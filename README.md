# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📚 StudyFlow AI

A modern AI-powered study management web application that helps students organize subjects, manage tasks, take notes, track study progress, and generate personalized study plans using Google's Gemini AI.

---

## 📖 Overview

StudyFlow AI is a full-stack MERN application designed to improve students' productivity by combining traditional study management with Artificial Intelligence.

Users can:

* Create and organize study subjects
* Manage daily study tasks
* Track task completion
* Store study notes
* View learning analytics
* Generate AI-powered study plans based on syllabus, exam date, and available study hours

---

# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes

---

## 📚 Subject Management

* Create Subjects
* View Subjects
* Delete Subjects

---

## ✅ Task Management

* Create Tasks
* Assign Tasks to Subjects
* Set Priority
* Set Due Date
* Mark Tasks as Completed
* Reopen Completed Tasks
* Delete Tasks

---

## 📝 Notes

* Create Notes
* Save Notes
* Delete Notes

---

## 📊 Analytics Dashboard

* Total Subjects
* Total Tasks
* Completed Tasks
* Pending Tasks
* Notes Count
* Study Progress Percentage

---

## 🤖 AI Study Planner

Generate personalized study plans using:

* Syllabus
* Exam Date
* Study Hours Per Day

Powered by **Google Gemini AI**.

If the AI service is unavailable, the application automatically generates a fallback study plan.

---

# 🛠 Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### AI

* Google Gemini API

---

# 📂 Project Structure

```bash
studyflow-ai/
│
├── client/
│   ├── public/
│   │   ├── vite.svg
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── AIPlanner.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── subjectService.js
│   │   │   ├── taskService.js
│   │   │   ├── noteService.js
│   │   │   └── aiService.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── subjectController.js
│   │   │   ├── taskController.js
│   │   │   ├── noteController.js
│   │   │   └── aiController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── notFoundMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Subject.js
│   │   │   ├── Task.js
│   │   │   └── Note.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── subjectRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   ├── noteRoutes.js
│   │   │   └── aiRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/karanmaury-git/studyflow-ai.git

cd studyflow-ai
```

---

## Backend Setup

```bash
cd server

npm install

npm run dev
```

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🎯 Future Improvements

* Dark Mode
* Calendar Integration
* Email Reminders
* PDF Export
* Pomodoro Timer
* Mobile Responsive Enhancements

---

# 👨‍💻 Author

**Karan Maurya**

Aspiring Full Stack MERN Developer passionate about building modern web applications using React, Node.js, MongoDB, Express, and AI-powered solutions.

---

# 📄 License

This project is licensed under the MIT License.
