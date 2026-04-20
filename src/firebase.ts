import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNVk6ZuPmLbRHlRN58bA2BLQJGa8pZwVI",
  authDomain: "fitapp-db766.firebaseapp.com",
  projectId: "fitapp-db766",
  storageBucket: "fitapp-db766.firebasestorage.app",
  messagingSenderId: "356076185654",
  appId: "1:356076185654:web:4f07d11ba1e974befa9097"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
