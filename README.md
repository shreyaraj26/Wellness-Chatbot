# 🌿 Wellness AI Chatbot

An empathetic and interactive AI-powered wellness assistant built with a React frontend and Express/Node.js backend, powered by Groq's fast LLM inference (`llama-3.1-8b-instant`).

## ✨ Features
- **Mindfulness & Stress Management**: Guides users through breathing exercises and stress relief tips.
- **Healthy Habits & Sleep Tips**: Positive daily habits, sleep hygiene, and lifestyle suggestions.
- **Empathetic AI Companion**: Built with a supportive and friendly persona.
- **Fast Responses**: Powered by Groq API.

---

## 📁 Project Structure

```
wellness-chatbot/
├── backend/            # Express server & Groq AI integration
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/           # React application
│   ├── src/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder based on `.env.example`:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend server:
```bash
npm start
# or with nodemon:
npx nodemon server.js
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the React application:
```bash
npm start
```

The app will run at `http://localhost:3000`.

---

## 🔒 Security Notice
Do not commit your `.env` files to GitHub. Ensure your API keys are kept secret.
