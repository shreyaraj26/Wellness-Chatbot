import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyAFj2TQktUFFbj4r9NI372E9LJmOu1gHPs",
  authDomain: "wellness-chatbot-3aa54.firebaseapp.com",
  projectId: "wellness-chatbot-3aa54",
  storageBucket: "wellness-chatbot-3aa54.firebasestorage.app",
  messagingSenderId: "37506081624",
  appId: "1:37506081624:web:fea9456b7903e1cf0f3b2d"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;