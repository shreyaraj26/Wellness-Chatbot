import { useState, useEffect } from "react";
import "./App.css";
import { askGemini } from "./api/gemini";
import MoodDashboard from "./MoodDashboard";

import { auth, db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("😊 Neutral");

const [messages, setMessages] = useState([
  {
    sender: "bot",
    text: "👋 Hello! I'm your Wellness AI Assistant."
  },
  {
    sender: "bot",
    text: "😊 How are you feeling today?"
  }
]);

  const [moodHistory, setMoodHistory] = useState([]);
useEffect(() => {
  const loadChatData = async () => {
    if (!auth.currentUser) return;

    // Load chat history
    const chatRef = doc(db, "chatHistory", auth.currentUser.uid);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
      setMessages(chatSnap.data().messages || []);
    }

    // Load mood history
    const moodRef = doc(db, "moodHistory", auth.currentUser.uid);
    const moodSnap = await getDoc(moodRef);

    if (moodSnap.exists()) {
      setMoodHistory(moodSnap.data().history || []);
    }
  };

  loadChatData();
}, []);

useEffect(() => {
  const saveChatData = async () => {
    if (!auth.currentUser) return;

    await setDoc(doc(db, "chatHistory", auth.currentUser.uid), {
      messages: messages,
      updatedAt: serverTimestamp()
    });

    await setDoc(doc(db, "moodHistory", auth.currentUser.uid), {
      history: moodHistory,
      updatedAt: serverTimestamp()
    });
  };

  saveChatData();
}, [messages, moodHistory]);

  const detectMood = (text) => {
    const t = text.toLowerCase();

    if (t.includes("happy")) return "😊 Happy";
    if (t.includes("sad")) return "😔 Sad";
    if (t.includes("stress")) return "😰 Stressed";
    if (t.includes("anxious")) return "😟 Anxious";
    if (t.includes("angry")) return "😡 Angry";
    if (t.includes("calm")) return "😌 Calm";

    return "😊 Neutral";
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const currentMood = detectMood(message);
    setMood(currentMood);

    setMoodHistory((prev) => [
      ...prev,
      {
        mood: currentMood,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }
    ]);

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = message;
    setMessage("");

    setLoading(true);

    try {
      const reply = await askGemini(userInput);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn't connect to the AI."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
  const defaultMessages = [
    {
      sender: "bot",
      text: "👋 Hello! I'm your Wellness AI Assistant."
    },
    {
      sender: "bot",
      text: "😊 How are you feeling today?"
    }
  ];

  setMessages(defaultMessages);
  setMoodHistory([]);
  setMood("😊 Neutral");

  if (!auth.currentUser) return;

  await setDoc(doc(db, "chatHistory", auth.currentUser.uid), {
    messages: defaultMessages,
    updatedAt: serverTimestamp()
  });

  await setDoc(doc(db, "moodHistory", auth.currentUser.uid), {
    history: [],
    updatedAt: serverTimestamp()
  });


    setMoodHistory([]);
    setMood("😊 Neutral");
  };

  return (
    <div className="chat-container">
      <h1>🤖 Wellness AI Chatbot</h1>

      <h3>Current Mood: {mood}</h3>

      <button
        onClick={clearChat}
        style={{
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          marginBottom: "15px",
          cursor: "pointer"
        }}
      >
        🗑 Clear Chat
      </button>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "bot"
                ? "bot-message"
                : "user-message"
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bot-message">
            🤖 WellnessAI is typing...
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>📜 Mood History</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "30px"
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Mood</th>
          </tr>
        </thead>

        <tbody>
          {moodHistory.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.mood}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <MoodDashboard moodHistory={moodHistory} />
    </div>
  );
}

export default Chatbot;