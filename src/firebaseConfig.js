// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAJ5UMm3PXthDfzV_abSorhSmTXlLH8s8",
  authDomain: "assignment-695d6.firebaseapp.com",
  projectId: "assignment-695d6",
  storageBucket: "assignment-695d6.firebasestorage.app",
  messagingSenderId: "114525161357",
  appId: "1:114525161357:web:af6d4004d00fe2043cdfc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
