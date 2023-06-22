import Header from "./includes/Header";
import React, { useEffect, useState } from "react";
//import { getDocs, collection, doc, query, addDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { updateDoc } from 'firebase/firestore';
import './style/App.css';
import { auth, db, googleProvider } from "./config/firebase";
import { Link } from "react-router-dom";

import {
  getDocs,
  collection,
  addDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

function Overview() {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDate, setDate] = useState();
  const [user, setUser] = useState(null);
  const [getPost, setPosts] = useState();
  const [postMessage] = useState([]);
  const [credentials, setCredentials] = useState();
  const [postCollectionRef, setPostCollectionRef] = useState();

// function Overview() {
  const [title] = useState("");
  const [description] = useState("");
  const [posts] = useState([]);

//     if (!title || !description) {
//       console.log("Please provide a title and description");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         title: title,
//         description: description,
//         date: serverTimestamp(),
//         author: {
//           name: auth.currentUser.displayName || "Unknown",
//           id: auth.currentUser.uid || "Unknown",
//         },
//       });
//       console.log("Post created successfully");
//       setTitle("");
//       setDescription("");
//     } catch (error) {
//       console.log("Error creating post:", error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("User is logged in");
//       } else {
//         console.log("User is logged out");
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

  

  const createPost = async () => {
    
    if (getTitle && getDescription && getDate) {
      await addDoc(collection(db, "posts"), {
        title: getTitle,
        description: getDescription,
        date: getDate,
        author: { name: user?.displayName || 'Unknown', id: user?.id || 'Unknown' }
      });
    } else {
      console.log("Missing required fields");
    }
  };

  // const getDocuments = () => {
  //   const q = query(collection(db, "posts"))
  //   getDocs(q).then(firebaseResponse => {
  //     const documentList = firebaseResponse.docs.map(doc.data());
  //     setPosts(documentList);
  //   })
  // }

  /*const addDoc = async () => {
    const postDoc = collection(db, "post", { title: title, description: description})
    await addDoc(postDoc)
  }*/

  //   const deleteDoc = async (id) => {
  //   const postDeleteDoc = doc(db, "posts", id)
  //   await deleteDoc(postDeleteDoc);
  // }

  // const loginWithGoogle = async () => {
  //   const credentials = await signInWithPopup(auth, googleProvider);
  //   setCredentials(credentials);
  //   console.log(credentials);
  // }
  
  // const like = async (postId) => {
  // const docRef = doc(db, "posts", postId);
  // await updateDoc(docRef, {likes: arrayUnion(credentials.user.id) });

  // getPost();
//}

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
      <Header />
      <div className="overview">
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
        <h1>Create a post</h1>
        <form onSubmit={createPost}>
        <div>
          <label className="title">Title:</label>
          <input
            type="text"
            id="title"
            value={getTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="description">Description:</label>
          <textarea
            id="description"
            value={getDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="date">Date:</label>
          <input type="date"
            id="date"
            value={getDate}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="author">Author:</label>
          <input type="text"
            id="author"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
          <button type="submit">Create post</button>
        </form>
      </div>
    </>
  );
}
export default Overview;