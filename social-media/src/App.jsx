import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {getDocs, collection, doc} from 'firebase/firestore';
import { db } from './config/firebase';


function App() {
  const [getTitle, setTitle] = useState("");
  const [getTask, setTask] = useState("");
  const [getStatus, setStatus] = useState("To do");

  const getDocuments = () => {
    const q = query(collection(db, "posts"))
    getDocs(q).then(firebaseResponse => {
      const documentList = firebaseResponse.docs.map(doc.data());
      setPosts(documentList);
    })
    
  }

  const addDoc = async () => {
    await addDoc(collection(db, "post"), { title: title, description: description})
  }

  const loginWithGoogle = async () => {
    const credentials = await signInWithPopUp(auth, googleProvider);
    setCredentials(credentials);
    console.log(credentials);
  }

  const createPost = async () => {
    await addDoc(postCollectionRef,
      {title: getTitle,
      description: getDescription,
      date: setDate,
      author:
      {name: auth.CurrentUser.displayName, id: auth.currentUser.id}
    });
  }

  useEffect(() => {
    getDocuments();
  }, [])

  return (
  <>
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/" element={<div>About!</div>} />
      <Route path="/*" element={<Details />} />
    </Routes>
      <div className="App">
        <h1>Mijn firebase data</h1>
        <div>
          {postMessage.map(post => {
            return (
              <div>
                {post.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default App;