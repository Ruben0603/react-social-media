import Header from "./includes/Header";
import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, arrayUnion, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import './style/App.css';
import { db } from "./config/firebase";

function Overview() {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDate, setDate] = useState();
  const [getAuthor, setAuthor] = useState();
  const [user, setUser] = useState(null);
  const [getPost, setPosts] = useState([]);
  const [postMessage] = useState([]);
  const [credentials, setCredentials] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // State voor de zoekterm

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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const documentList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(documentList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Functie om posts te filteren op basis van de zoekterm
  const filterPosts = (posts, searchTerm) => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Event handler voor het wijzigen van de zoekterm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter de posts op basis van de zoekterm
  const filteredPosts = filterPosts(getPost, searchTerm);

  return (
    <>
      <Header />
      <div className="overview">
        <div>
          <h1 className="text-3xl font-bold underline">Show posts</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>{post.author}</p>
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
            <input
              type="date"
              id="date"
              value={getDate}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="author">Author:</label>
            <input
              type="text"
              id="author"
              value={getAuthor}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <button className="text-3xl font-bold underline border-hidden background-blue-500" type="submit">Create post</button>
        </form>
      </div>
    </>
  );
}

export default Overview;

// import Header from "./includes/Header";
// import React, { useEffect, useState } from "react";
// //import { getDocs, collection, doc, query, addDoc, arrayUnion } from 'firebase/firestore';
// import { onAuthStateChanged } from "firebase/auth";
// import { updateDoc } from 'firebase/firestore';
// import './style/App.css';
// import { auth, db } from "./config/firebase";

// import { getDocs, collection, addDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

// function Overview() {
//   const [getTitle, setTitle] = useState("");
//   const [getDescription, setDescription] = useState("");
//   const [getDate, setDate] = useState();
//   const [getAuthor, setAuthor] = useState();
//   const [user, setUser] = useState(null);
//   const [getPost, setPosts] = useState();
//   const [postMessage] = useState([]);
//   const [credentials, setCredentials] = useState();
//   const [postCollectionRef, setPostCollectionRef] = useState();
//   const [title] = useState("");
//   const [description] = useState("");
//   const [posts] = useState([]);

// //     if (!title || !description) {
// //       console.log("Please provide a title and description");
// //       return;
// //     }

// //     try {
// //       await addDoc(collection(db, "posts"), {
// //         title: title,
// //         description: description,
// //         date: serverTimestamp(),
// //         author: {
// //           name: auth.currentUser.displayName || "Unknown",
// //           id: auth.currentUser.uid || "Unknown",
// //         },
// //       });
// //       console.log("Post created successfully");
// //       setTitle("");
// //       setDescription("");
// //     } catch (error) {
// //       console.log("Error creating post:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         console.log("User is logged in");
// //       } else {
// //         console.log("User is logged out");
// //       }
// //     });

// //     return () => {
// //       unsubscribe();
// //     };
// //   }, []);

  

//   const createPost = async () => {
    
//     if (getTitle && getDescription && getDate) {
//       await addDoc(collection(db, "posts"), {
//         title: getTitle,
//         description: getDescription,
//         date: getDate,
//         author: { name: user?.displayName || 'Unknown', id: user?.id || 'Unknown' }
//       });
//     } else {
//       console.log("Missing required fields");
//     }
//   };

//   // const getDocuments = () => {
//   //   const q = query(collection(db, "posts"))
//   //   getDocs(q).then(firebaseResponse => {
//   //     const documentList = firebaseResponse.docs.map(doc.data());
//   //     setPosts(documentList);
//   //   })
//   // }

//   /*const addDoc = async () => {
//     const postDoc = collection(db, "post", { title: title, description: description})
//     await addDoc(postDoc)
//   }*/

//   //   const deleteDoc = async (id) => {
//   //   const postDeleteDoc = doc(db, "posts", id)
//   //   await deleteDoc(postDeleteDoc);
//   // }

//   // const loginWithGoogle = async () => {
//   //   const credentials = await signInWithPopup(auth, googleProvider);
//   //   setCredentials(credentials);
//   //   console.log(credentials);
//   // }
  
//   // const like = async (postId) => {
//   // const docRef = doc(db, "posts", postId);
//   // await updateDoc(docRef, {likes: arrayUnion(credentials.user.id) });

//   // getPost();
// //}

// useEffect(() => {
//   return onAuthStateChanged(auth, (user) => {
//     if (user){
//       setUser(user);
//       console.log("Wel user")
//     }else{
//       setUser(null)
//       console.log("Geen user")
//     }
//   });
// })

// return (
//     <>
//       <Header />
//       <div className="overview">
//         <div>
//         <h1>Show posts</h1>
//           {posts.map((post) => (
//             <div key={post.id}>
//               <h3>{post.title}</h3>
//               <p>{post.description}</p>
//               <p>{post.author}</p>
//             </div>
//           ))}
//         </div>
//         <h1>Create a post</h1>
//         <form onSubmit={createPost}>
//         <div>
//           <label className="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={getTitle}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="description">Description:</label>
//           <textarea
//             id="description"
//             value={getDescription}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>
//         <div>
//           <label className="date">Date:</label>
//           <input type="date"
//             id="date"
//             value={getDate}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="author">Author:</label>
//           <input type="text"
//             id="author"
//             value={getAuthor}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//         </div>
//           <button type="submit">Create post</button>
//         </form>
//       </div>
//     </>
//   );
// }
// export default Overview;