import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const getEnv = (key: string, fallback: string): string => {
  const val = import.meta.env[key];
  if (val && typeof val === "string" && val.trim() !== "" && !val.includes("MY_") && !val.includes("PLACEHOLDER")) {
    return val;
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY", "AIzaSyDHSY_vGko5FendFFVqnv5q4MdmnKrLi-g"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", "wam2026-8d969.firebaseapp.com"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", "wam2026-8d969"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", "wam2026-8d969.firebasestorage.app"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "658568660162"),
  appId: getEnv("VITE_FIREBASE_APP_ID", "1:658568660162:web:a61a72f574440f54fd275b")
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export default app;
