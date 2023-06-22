import React, { useState } from "react";
import "./style/App.css";
import { createUserWithEmailAndPassword, auth } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerComplete, setRegisterComplete] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        const user = userCredential.user;
        console.log("Registered user:", user);
        setRegisterComplete("Registration successful");
      })
      .catch((error) => {
        // Registration failed
        const errorMessage = error.message;
        console.log("Registration error:", errorMessage);
        setRegisterComplete(errorMessage);
      });
  };

  return (
    <div className="registerWrapper">
      <div className="registerLeft">
        <h3 className="registerLogo">Social Media</h3>
        <span className="registerDesc">
          Connect with friends and the world around you on Social Media.
        </span>
      </div>
      <div className="registerRight">
        <div className="registerBox">
          <input
            placeholder="Email"
            type="email"
            className="registerInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="registerInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" onClick={handleRegister}>
            Register
          </button>
          <button className="registerLoginButton" onClick={"Login.jsx"}>
            Log into Account
          </button>
        </div>
        {registerComplete && <p>{registerComplete}</p>}
      </div>
    </div>
  );
}

export default Register;