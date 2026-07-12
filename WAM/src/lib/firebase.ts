import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { customFirebaseConfig } from "./firebase-custom-config";

const getEnv = (key: string, fallback: string): string => {
  const val = import.meta.env[key];
  if (val && typeof val === "string" && val.trim() !== "" && !val.includes("MY_") && !val.includes("PLACEHOLDER")) {
    return val;
  }
  return fallback;
};

const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY", customFirebaseConfig.apiKey),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", customFirebaseConfig.authDomain),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", customFirebaseConfig.projectId),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", customFirebaseConfig.storageBucket),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", customFirebaseConfig.messagingSenderId),
  appId: getEnv("VITE_FIREBASE_APP_ID", customFirebaseConfig.appId)
};

let app: any = null;
let firestore: any = null;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestore = getFirestore(app);
    console.log("Firebase initialized successfully in safe-mode.");
  } else {
    console.log("Firebase config is empty. Firebase is fully disabled. Running in 100% safe local offline mode.");
  }
} catch (error) {
  console.warn("Failed to initialize Firebase in safe mode, using fallback mock to prevent crash:", error);
}

// Export dummy elements to prevent any import breakage
export { firestore };
export default app;
