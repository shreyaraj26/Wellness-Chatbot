import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

function MedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
const [dosage, setDosage] = useState("");
const [time, setTime] = useState("");
const [repeat, setRepeat] = useState("Daily");

const [medicines, setMedicines] = useState([]);


  useEffect(() => {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}, []);

useEffect(() => {
    fetchMedicines();
}, []);

useEffect(() => {

    const interval = setInterval(() => {

        const now = new Date();

        const currentTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        medicines.forEach((medicine) => {

            if (
                medicine.time === currentTime &&
                !medicine.taken &&
                Notification.permission === "granted"
            ) {

                new Notification("💊 Medicine Reminder", {
                    body: `Take ${medicine.medicineName} (${medicine.dosage})`,
                    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
                });

            }

        });

    }, 30000);

    return () => clearInterval(interval);

}, [medicines]);


  const addMedicine = async () => {

  if (
    medicineName === "" ||
    dosage === "" ||
    time === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

    await addDoc(collection(db, "medicineReminders"), {

      medicineName,
      dosage,
      time,
      repeat,
      taken: false

    });

    alert("Medicine Added Successfully");

    setMedicineName("");
    setDosage("");
    setTime("");

    fetchMedicines();

  } catch (error) {

    console.log(error);
    alert("Error adding medicine");

  }

};
const fetchMedicines = async () => {

  try {

    const querySnapshot = await getDocs(
      collection(db, "medicineReminders")
    );

    const medicineList = [];

    querySnapshot.forEach((doc) => {

      medicineList.push({
        id: doc.id,
        ...doc.data(),
      });

    });

    setMedicines(medicineList);

  } catch (error) {

    console.log(error);

  }

};

  const deleteMedicine = (id) => {
    setMedicines(
      medicines.filter((m) => m.id !== id)
    );
  };

  const toggleTaken = (id) => {

    setMedicines(
      medicines.map((m) =>
        m.id === id
          ? { ...m, taken: !m.taken }
          : m
      )
    );

  };

  return (

    <div className="tracker-card">

      <h2>💊 Medicine Reminder</h2>

      <input
        type="text"
        placeholder="Medicine Name"
        value={medicineName}
        onChange={(e) =>
          setMedicineName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Dosage"
        value={dosage}
        onChange={(e) =>
          setDosage(e.target.value)
        }
      />

      <br /><br />

      <input
        type="time"
        value={time}
        onChange={(e) =>
          setTime(e.target.value)
        }
      />

      <br /><br />

      <label>Repeat</label>

      <br />

      <select
        value={repeat}
        onChange={(e) =>
          setRepeat(e.target.value)
        }
      >
        <option>Once</option>
        <option>Daily</option>
        <option>Weekly</option>
      </select>

      <br /><br />

      <button onClick={addMedicine}>
        ➕ Add Medicine
      </button>

      <hr />

      {medicines.map((medicine) => (

        <div
          className="card"
          key={medicine.id}
        >

          <h3>{medicine.medicineName}</h3>

          <p>💊 {medicine.dosage}</p>

          <p>⏰ {medicine.time}</p>

          <p>🔄 {medicine.repeat}</p>

          <p>
            {medicine.taken
              ? "✅ Taken"
              : "❌ Not Taken"}
          </p>

          <button
            onClick={() =>
              toggleTaken(medicine.id)
            }
          >
            {medicine.taken
              ? "Undo"
              : "Mark Taken"}
          </button>

          <button
            style={{
              background: "red",
              marginLeft: 10
            }}
            onClick={() =>
              deleteMedicine(medicine.id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default MedicineReminder;