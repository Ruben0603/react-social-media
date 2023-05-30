import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { db } from './config/firebase';

function App() {
  const [posts, getPosts] = posts;
  const [description, getDescription] = description;

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