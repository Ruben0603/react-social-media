import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
});