import { useState, useEffect } from "react";
import "./App.css";

function DailyCheckin() {

    const [mood, setMood] = useState(() =>
        localStorage.getItem("dailyMood") || "😊"
    );

    const [energy, setEnergy] = useState(() =>
        Number(localStorage.getItem("energy")) || 5
    );

    const [stress, setStress] = useState(() =>
        Number(localStorage.getItem("stress")) || 5
    );

    const [note, setNote] = useState(() =>
        localStorage.getItem("note") || ""
    );

    useEffect(() => {
        localStorage.setItem("dailyMood", mood);
        localStorage.setItem("energy", energy);
        localStorage.setItem("stress", stress);
        localStorage.setItem("note", note);
    }, [mood, energy, stress, note]);

    return (
        <div className="tracker-card">

            <h2>😊 Daily Wellness Check-in</h2>

            <h3>Today's Mood</h3>

            <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
            >
                <option>😊</option>
                <option>😄</option>
                <option>😌</option>
                <option>😔</option>
                <option>😢</option>
                <option>😡</option>
                <option>😰</option>
            </select>

            <br /><br />

            <h3>⚡ Energy Level</h3>

            <input
                type="range"
                min="1"
                max="10"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
            />

            <p>{energy}/10</p>

            <h3>😟 Stress Level</h3>

            <input
                type="range"
                min="1"
                max="10"
                value={stress}
                onChange={(e) => setStress(e.target.value)}
            />

            <p>{stress}/10</p>

            <h3>📝 Journal</h3>

            <textarea
                rows="5"
                style={{ width: "100%" }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write about your day..."
            />

        </div>
    );
}

export default DailyCheckin;