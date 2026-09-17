import { useState, useEffect } from "react";
import "./App.css";

import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function WaterTracker() {
  const [water, setWater] = useState(0);

  useEffect(() => {
    const loadWater = async () => {
      if (!auth.currentUser) return;

      const docRef = doc(db, "waterTracker", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWater(docSnap.data().water);
      }
    };

    loadWater();
  }, []);

  const addWater = async () => {
    if (!auth.currentUser) return;

    if (water < 8) {
      const newWater = water + 1;
      setWater(newWater);

      await setDoc(doc(db, "waterTracker", auth.currentUser.uid), {
        water: newWater,
      });
    }
  };

  const removeWater = async () => {
    if (!auth.currentUser) return;

    if (water > 0) {
      const newWater = water - 1;
      setWater(newWater);

      await setDoc(doc(db, "waterTracker", auth.currentUser.uid), {
        water: newWater,
      });
    }
  };

  const percentage = (water / 8) * 100;

  return (
    <div className="tracker-card">
      <h2>💧 Water Intake Tracker</h2>

      <h3>{water} / 8 Glasses</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="tracker-buttons">
        <button onClick={removeWater}>➖</button>
        <button onClick={addWater}>➕</button>
      </div>

      {water === 8 && (
        <p style={{ color: "green", marginTop: "15px" }}>
          🎉 Daily water goal achieved!
        </p>
      )}
    </div>
  );
}

export default WaterTracker;