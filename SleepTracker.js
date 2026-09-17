import { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SleepTracker() {
  const [sleepHours, setSleepHours] = useState(8);

  // Load sleep data from Firestore
  useEffect(() => {
    const loadSleep = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "sleepTracker", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSleepHours(docSnap.data().sleepHours);
      }
    };

    loadSleep();
  }, []);

  // Save sleep data whenever it changes
  useEffect(() => {
    const saveSleep = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "sleepTracker", auth.currentUser.uid);

      await setDoc(docRef, {
        sleepHours: sleepHours,
      });
    };

    saveSleep();
  }, [sleepHours]);

  const increase = () => {
    if (sleepHours < 15) {
      setSleepHours(sleepHours + 1);
    }
  };

  const decrease = () => {
    if (sleepHours > 0) {
      setSleepHours(sleepHours - 1);
    }
  };

  let quality = "😴 Poor";

  if (sleepHours >= 7 && sleepHours <= 9) {
    quality = "😊 Excellent";
  } else if (sleepHours >= 5) {
    quality = "🙂 Average";
  }

  return (
    <div className="tracker-card">
      <h2>😴 Sleep Tracker</h2>

      <h3>{sleepHours} Hours</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(sleepHours / 10) * 100}%`,
          }}
        ></div>
      </div>

      <div className="tracker-buttons">
        <button onClick={decrease}>➖</button>
        <button onClick={increase}>➕</button>
      </div>

      <h3>{quality}</h3>
    </div>
  );
}

export default SleepTracker;