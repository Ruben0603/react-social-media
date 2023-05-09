import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  const getDocuments = () => {
    getDocs
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/" element={<div>About!</div>} />
        <Route path="/*" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
