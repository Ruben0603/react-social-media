import Header from "./includes/Header";
import React from 'react';
import { signInWithGoogle } from './config/firebase';
import './style/App.css';

const Login = () => {
  return (
    <>
      <Header />
      <div>
        <button className="button" onClick={signInWithGoogle}>
          <i className="fab fa-google"></i> Sign in with Google
        </button>
      </div>
    </>
  );
};

export default Login;