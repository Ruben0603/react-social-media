import React from 'react';
import { loginWithGoogle } from '../services/firebase';
import '../App.css';

const Login = () => {
  return (
    <div>
      <button className="button" onClick={loginWithGoogle}>
        <i className="fab fa-google"></i> Sign in with Google
      </button>
    </div>
  );
};

export default Login;