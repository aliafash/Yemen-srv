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
  apiKey: getEnv("VITE_FIREBASE_API_KEY", "AIzaSyBq2SEhBADFGVF4sDyV3sC_t2HqQ1m8lC0"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", "serviseyem.firebaseapp.com"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", "serviseyem"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", "serviseyem.firebasestorage.app"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "954106721012"),
  appId: getEnv("VITE_FIREBASE_APP_ID", "1:954106721012:android:5fa5e385532b08d5c0e4a1")
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export default app;
