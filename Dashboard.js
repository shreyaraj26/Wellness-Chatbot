import "./App.css";
import { Link } from "react-router-dom";

import MoodDashboard from "./MoodDashboard";
import WaterTracker from "./WaterTracker";
import SleepTracker from "./SleepTracker";
import ActivityTracker from "./ActivityTracker";
import MedicineReminder from "./MedicineReminder";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>👋 Welcome to Wellness Chatbot</h1>
      <p>Your personal wellness companion.</p>

      {/* Mood Tracker */}
      <MoodDashboard />

      {/* AI Chat */}
      <div className="card">
        <h2>🤖 AI Chat</h2>
        <p>Talk to your Wellness AI Assistant.</p>

        <Link to="/chat">
          <button>Open Chatbot</button>
        </Link>
      </div>

      {/* Water Tracker */}
      <WaterTracker />

      {/* Sleep Tracker */}
      <SleepTracker />

      {/* Daily Activity Tracker */}
      <ActivityTracker />

      {/* Medicine Reminder */}
      <MedicineReminder />
    </div>
  );
}

export default Dashboard;