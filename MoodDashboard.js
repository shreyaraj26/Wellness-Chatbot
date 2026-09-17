import { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

function MoodDashboard() {
  const [mood, setMood] = useState("");

  useEffect(() => {
    const loadMood = async () => {

      if (!auth.currentUser) return;

      const docRef = doc(db, "moodTracker", auth.currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMood(docSnap.data().mood);
      }

    };

    loadMood();

  }, []);

  const updateMood = async (selectedMood) => {

    setMood(selectedMood);

    if (!auth.currentUser) return;

    await setDoc(
      doc(db, "moodTracker", auth.currentUser.uid),
      {
        mood: selectedMood,
        updatedAt: serverTimestamp()
      }
    );

  };

  return (
    <div className="tracker-card">

      <h2>😊 Mood Tracker</h2>

      <h3>
        {mood === ""
          ? "How are you feeling today?"
          : `Current Mood: ${mood}`}
      </h3>

      <div className="tracker-buttons">

        <button onClick={() => updateMood("😊 Happy")}>
          😊 Happy
        </button>

        <button onClick={() => updateMood("😐 Neutral")}>
          😐 Neutral
        </button>

        <button onClick={() => updateMood("😔 Sad")}>
          😔 Sad
        </button>

        <button onClick={() => updateMood("😡 Angry")}>
          😡 Angry
        </button>

        <button onClick={() => updateMood("😰 Stressed")}>
          😰 Stressed
        </button>

        <button onClick={() => updateMood("😍 Excited")}>
          😍 Excited
        </button>

      </div>

    </div>
  );
}

export default MoodDashboard;