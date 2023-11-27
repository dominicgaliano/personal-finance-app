// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfVQKLps3i9Qwi-94R33oQFqj-iQL88nU",
  authDomain: "dev-personal-finance-app.firebaseapp.com",
  projectId: "dev-personal-finance-app",
  storageBucket: "dev-personal-finance-app.appspot.com",
  messagingSenderId: "386390593867",
  appId: "1:386390593867:web:0983fc7a45d387531298ce",
  measurementId: "G-9597LP4BCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
