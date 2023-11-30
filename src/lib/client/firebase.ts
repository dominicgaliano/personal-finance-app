import { memoize } from "lodash";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { browser } from "$app/environment";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === "true",
};

// Firebase Initialization Function (memoized for performance)
export const initFirebase = memoize(() => {
  if (!browser) {
    throw new Error("Can't use the Firebase client on the server.");
  }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  if (firebaseConfig.useEmulator) {
    const emulatorHost = 'http://' + import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST || "http://127.0.0.1:9099";

    // note: connectAuthEmulator takes host in the form of http://127.0.0.1:9099
    connectAuthEmulator(auth, emulatorHost);
  }
  // const analytics = getAnalytics(app);
  return { app, auth, firestore };
});
