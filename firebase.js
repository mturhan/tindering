// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZLnbKI4ssC8N3ZakTSPg5xoL47yUZrbk",
  authDomain: "tindering-2e263.firebaseapp.com",
  projectId: "tindering-2e263",
  storageBucket: "tindering-2e263.appspot.com",
  messagingSenderId: "249573038266",
  appId: "1:249573038266:web:6063f2db6ad28c54180a83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
