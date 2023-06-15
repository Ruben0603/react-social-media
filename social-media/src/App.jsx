import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router';
import { getDocs, collection, doc, query, addDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { updateDoc } from 'firebase/firestore';
import './App.css';
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
  const [postMessage, setPostMessage] = useState([]);
  const [credentials, setCredentials] = useState();
  const [postCollectionRef, setPostCollectionRef] = useState(collection(db, "posts"));

  const getDocuments = () => {
    const postsCollectionRef = collection(db, "posts");
    getDocs(postsCollectionRef).then(firebaseResponse => {
      const documentList = firebaseResponse.docs.map(doc => doc.data());
      setPosts(documentList);
    });
  }
    

  const addDoc = async () => {
    const postDoc = setPostCollectionRef(db, "post", {title: getTitle, description: getDescription})
    await addDoc(postDoc)
  }

    const deleteDoc = async (id) => {
    const postDeleteDoc = doc(db, "posts", id)
    await deleteDoc(postDeleteDoc);
  }

  const signInWithGoogle = async () => {
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

  useEffect(() => {
    getDocuments();
  }, [])
  
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