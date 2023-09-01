// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyCPyRUwj8Zji0dW-j0p57igE9HTs5Fff88",
    authDomain: "react-todo-app-3207d.firebaseapp.com",
    projectId: "react-todo-app-3207d",
    storageBucket: "react-todo-app-3207d.appspot.com",
    messagingSenderId: "822032780863",
    appId: "1:822032780863:web:75a019f14d4ea3c590328a",
    measurementId: "G-K2K4L707QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);


export {
    analytics, auth, firestore
}
