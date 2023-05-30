// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0gooQzfMTrHnR-9ERkP0P-rBYm3LS8d8",
  authDomain: "social-media-aeef6.firebaseapp.com",
  projectId: "social-media-aeef6",
  storageBucket: "social-media-aeef6.appspot.com",
  messagingSenderId: "208622485171",
  appId: "1:208622485171:web:b871be2746e67804957ac6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new googleAuthProvider(app);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);