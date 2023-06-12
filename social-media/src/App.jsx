import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { getDocs, collection, doc, query, addDoc, arrayUnion } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { auth, db, GoogleAuthProvider } from "./config/firebase";
import { signInWithPopup } from "firebase/auth";
import {Overview, Details} from "./App.jsx";
import { updateDoc } from 'firebase/firestore';

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
  const [credentials, setCredentials] = useState();
  const [postCollectionRef, setPostCollectionRef] = useState();

  const getDocuments = () => {
    const q = query(collection(db, "posts"))
    getDocs(q).then(firebaseResponse => {
      const documentList = firebaseResponse.docs.map(doc.data());
      setPosts(documentList);
    })
  }

  /*const addDoc = async () => {
    const postDoc = collection(db, "post", { title: title, description: description})
    await addDoc(postDoc)
  }*/

    const deleteDoc = async (id) => {
    const postDeleteDoc = doc(db, "posts", id)
    await deleteDoc(postDeleteDoc);
  }

  const loginWithGoogle = async () => {
    const credentials = await signInWithPopup(auth, GoogleAuthProvider);
    setCredentials(credentials);
    console.log(credentials);
  }

  const createPost = async () => {
    await addDoc(postCollectionRef,
      {
        title: getTitle,
        description: getDescription,
        date: getDate,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.id }
      });
  }

  useEffect(() => {
    getDocuments();
  }, [])
  
  const like = async (postId) => {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {likes: arrayUnion(credentials.user.id) });

  getPost();
}

  return (
    <>
      <Routes>
        {/*<Route path="/" element={<Overview />} />
        <Route path="/" element={<div>About!</div>} />
        <Route path="/*" element={<Details />} />*/}
      </Routes>
      <div className="App">
        <h1>Mijn firebase data</h1>
        <div>
          {postMessage.map(post => {
            return (
              <div key={post.id}>
                {post.title}
                {post.description}
              </div>
              //{credentials ?

              //}
            );
          })}
        </div>
      </div>
    </>
  )
}






export default App;

