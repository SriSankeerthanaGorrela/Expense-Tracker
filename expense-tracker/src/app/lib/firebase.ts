// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUY34IchjgqXK3fbee8MVzBGsntk-hZbo",
  authDomain: "expense-tracker-304b2.firebaseapp.com",
  projectId: "expense-tracker-304b2",
  storageBucket: "expense-tracker-304b2.firebasestorage.app",
  messagingSenderId: "699149608851",
  appId: "1:699149608851:web:ac7d142095b1bc14c32a66",
  measurementId: "G-3VGZ7QELH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);