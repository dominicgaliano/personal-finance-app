import { memoize } from "lodash";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfVQKLps3i9Qwi-94R33oQFqj-iQL88nU",
  authDomain: "dev-personal-finance-app.firebaseapp.com",
  projectId: "dev-personal-finance-app",
  storageBucket: "dev-personal-finance-app.appspot.com",
  messagingSenderId: "386390593867",
  appId: "1:386390593867:web:0983fc7a45d387531298ce",
  measurementId: "G-9597LP4BCC",
};

// Firebase Initialization Function (memoized for performance)
export const initFirebase = memoize(() => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  // const analytics = getAnalytics(app);
  return { app, auth, firestore };
});
