import { useState } from "react";
import './Register.css';
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "firebase/auth";

function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerComplete, setRegisterComplete] = useState("");

return ( 
    <div className="registerWrapper">
        <div className="registerLeft">
            <h3 className="registerLogo">Social Media</h3>
            <span className="registerDesc">Connect with friends and the world around you on Social Media.</span>
        </div>
        <div className="registerRight">
            <div className="registerBox">
                <input placeholder="Email" type="email" className="registerInput" onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" className="registerInput" onChange={(e) => setPassword(e.target.value)} />
                <button className="registerButton" onClick={register}>Register</button>
                <button className="registerLoginButton">Log into Account</button>
                <span className="registerForgot">Forgot Password?</span>
            </div>
        </div>
    </div>
)};

