// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tripful.firebaseapp.com",
    projectId: "tripful",
    storageBucket: "tripful.appspot.com",
    messagingSenderId: "770117021650",
    appId: "1:770117021650:web:91f508763d5eabc2b1620b",
    measurementId: "G-DHC7NZWBZE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
