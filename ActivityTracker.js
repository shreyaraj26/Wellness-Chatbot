import { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function ActivityTracker() {
  const [steps, setSteps] = useState(0);

  // Load steps from Firestore
  useEffect(() => {
    const loadSteps = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "activityTracker", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSteps(docSnap.data().steps || 0);
      }
    };

    loadSteps();
  }, []);

  // Save steps to Firestore whenever they change
  useEffect(() => {
    const saveSteps = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "activityTracker", auth.currentUser.uid);

      await setDoc(docRef, {
        steps: steps,
      });
    };

    saveSteps();
  }, [steps]);

  const addSteps = () => {
    if (steps < 10000) {
      setSteps((prev) => Math.min(prev + 500, 10000));
    }
  };

  const removeSteps = () => {
    if (steps > 0) {
      setSteps((prev) => Math.max(prev - 500, 0));
    }
  };

  const percentage = (steps / 10000) * 100;

  return (
    <div className="tracker-card">
      <h2>🚶 Daily Activity Tracker</h2>

      <h3>{steps} / 10000 Steps</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="tracker-buttons">
        <button onClick={removeSteps}>➖</button>
        <button onClick={addSteps}>➕ 500</button>
      </div>

      {steps >= 10000 && (
        <p style={{ color: "green", marginTop: "15px" }}>
          🎉 Daily step goal achieved!
        </p>
      )}
    </div>
  );
}

export default ActivityTracker;