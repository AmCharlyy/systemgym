import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNVk6ZuPmLbRHlRN58bA2BLQJGa8pZwVI",
    authDomain: "fitapp-db766.firebaseapp.com",
    projectId: "fitapp-db766",
    storageBucket: "fitapp-db766.firebasestorage.app",
    messagingSenderId: "356076185654",
    appId: "1:356076185654:web:4f07d11ba1e974befa9097"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
