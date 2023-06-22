import React, { useState } from "react";
import { Route, Routes } from 'react-router';
import './style/App.css';


import Overview from './Overview';
import Register from './register';
import Login from './Login';

//import { Overview, Register, Login } from "./App";
//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";


function App() {
  const [user] = useState();
   
  return (
    <>
      <Routes>
        <Route path="/" element={<Overview/>} />
        <Route path="/:userId" element={<Overview credentials={user}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;