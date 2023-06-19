import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router';
import { getDocs, collection, doc, query, addDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { updateDoc } from 'firebase/firestore';
import './style/App.css';
import { auth, googleProvider } from "./config/firebase";


import Overview from './Overview';
import Register from './Register';
import Login from './Login';

//import { Overview, Register, Login } from "./App";
//import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";


function App() {
  const [user, setUser] = useState();
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
    const credentials = await signInWithPopup(auth, googleProvider);
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
  
  const like = async (postId) => {
  const docRef = doc(db, "posts", postId);
  await updateDoc(docRef, {likes: arrayUnion(credentials.user.id) });

  getPost();
}

useEffect(() => {
  return onAuthStateChanged(auth, (user) => {
    if (user){
      setUser(user);
      console.log("Wel user")
    }else{
      setUser(null)
      console.log("Geen user")
    }
  });
})

  return (
    <>
      <Routes>
        <Route path="/:userId" element={<Overview credentials={user}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="App">
        <h1>Social Media</h1>
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