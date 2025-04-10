import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHhFoPrGNDU-25u46bnivX3faDnonSDTw",
    authDomain: "etec25-6a8e0.firebaseapp.com",
    projectId: "etec25-6a8e0",
    storageBucket: "etec25-6a8e0.firebasestorage.app",
    messagingSenderId: "276477937620",
    appId: "1:276477937620:web:10b91818817eb11966f841"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
