// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider, getAuth } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwRBKpUdLWZPkilOki5YkwxnbB6_IoZeg",
  authDomain: "social-a1e6a.firebaseapp.com",
  projectId: "social-a1e6a",
  storageBucket: "social-a1e6a.appspot.com",
  messagingSenderId: "1045077261494",
  appId: "1:1045077261494:web:b5e4ab07560bb0d6ca3a17",
  measurementId: "G-09G708PZNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default app;