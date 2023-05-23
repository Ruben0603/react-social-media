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

  const toevoegenDoc = async () => {
    await addDoc(collection(db, "post"), { title: title, description: description})
  }

  const loginMetGoogle = async () => {
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