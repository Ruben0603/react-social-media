import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBwRBKpUdLWZPkilOki5YkwxnbB6_IoZeg",
  authDomain: "social-a1e6a.firebaseapp.com",
  projectId: "social-a1e6a",
  storageBucket: "social-a1e6a.appspot.com",
  messagingSenderId: "1045077261494",
  appId: "1:1045077261494:web:b5e4ab07560bb0d6ca3a17",
  measurementId: "G-09G708PZNY"
};

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  
  export const db = getFirestore(app);
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default app;