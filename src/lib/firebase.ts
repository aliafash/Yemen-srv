import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDHSY_vGko5FendFFVqnv5q4MdmnKrLi-g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wam2026-8d969.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wam2026-8d969",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wam2026-8d969.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "658568660162",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:658568660162:web:a61a72f574440f54fd275b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export default app;
