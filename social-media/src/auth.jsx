import { auth, googleProvider } from "./config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
        }
    };
    
    const signInWithGoogle = async () => {
        try {
        await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err)
        }
    };

    const logout = async () => {
        try {
        await signOut(auth);
        } catch (err) {
            console.error(err)
        }
    };

    return (
    <>
    <h1 className="flex justify-center mt-8 mb-4">Register</h1>
        <div className="flex justify-center">
            
            <div className="flex flex-col">
            <label className="mt-2 flex justify-start">Login</label>
                <input className="rounded-md border border-2 border-slate-500"
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="mt-2 flex justify-start">Password</label>
                <input className="rounded-md border border-2 border-slate-500"
                    placeholder="Password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <button className="w-20 rounded-lg font-bold bg-blue-300 p-1 mt-2" onClick={signIn}> Sign In </button>

                        <button className="w-44 rounded-lg font-bold bg-blue-300 p-1 mt-2" onClick={signInWithGoogle}> Sign In With Google </button>

                        <button className="w-20 rounded-lg font-bold bg-blue-300 p-1 mt-2" onClick={logout}> Logout </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}