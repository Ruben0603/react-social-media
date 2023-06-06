import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { getDocs, collection, doc, query, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { auth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './App.css';


function App() {
  const [db, setdb] = useState();
  const [getPost, setPosts] = useState();
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDate, setDate] = useState();
  //const [getTask, setTask] = useState("");
  //const [getStatus, setStatus] = useState("To do");
  const [postMessage, setPostMessage] = useState([]);

  const getDocuments = () => {
    const q = query(collection(db, "posts"))
    getDocs(q).then(firebaseResponse => {
      const documentList = firebaseResponse.docs.map(doc.data());
      setPosts(documentList);
    })
    
  }

  const addDoc = async () => {
    const postDoc = collection(db, "post", { title: title, description: description})
    await addDoc(postDoc)
  }

  const deleteDoc = async (id) => {
    const postDeleteDoc = doc(db, "posts", id)
    await deleteDoc(postDeleteDoc);
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
      date: getDate,
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