import Header from "./includes/Header";
import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, updateDoc, arrayUnion, serverTimestamp, query, where, onSnapshot, onAuthStateChanged } from "firebase/firestore";
import './style/App.css';
import { db, auth } from "./config/firebase";

function Overview() {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDate, setDate] = useState();
  const [getAuthor, setAuthor] = useState();
  const [user, setUser] = useState(null);
  const [getPost, setPosts, doc] = useState([]);
  const [postMessage] = useState([]);
  const [credentials, setCredentials] = useState();
  const [searchTerm, setSearchTerm] = useState(""); // State voor de zoekterm

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const documentList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(documentList);

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

    return () => {
      unsubscribe();
    };
  }, []);
  
  //Get documents
  const getDocuments = () => {
    const q = query(collection(db, "posts"))
    getDocs(q).then(firebaseResponse => {
      const documentList = firebaseResponse.docs.map(doc.data());
      setPosts(documentList);
    })
  }

  //Create posts
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

    //Delete posts
    const deletePost = async (id) => {
    const postDeleteDoc = doc(db, "posts", id)
    await deletePost(postDeleteDoc);
  }

  //Functie om posts te filteren op basis van de zoekterm
  const filterPosts = (posts, searchTerm) => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  //Event handler voor het wijzigen van de zoekterm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  //Filter de posts op basis van de zoekterm
  const filteredPosts = filterPosts(getPost, searchTerm);

  //Functie om posts te kunnen liken
  const like = async (postId) => {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {likes: arrayUnion(credentials.user.id) });
  
    getPost();
  }

  return (
    <>
      <Header />
      <div className="overview">
        <div>
          <h1 className="">Show posts</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {filteredPosts.map((post) => (
            <>
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.date}</p>
                <p>{post.author}</p>
              </div>
              <button className="" onClick={like}>Like</button>
            </>
          ))}
        </div>
        <h1>Create a post</h1>
        <form action={createPost}>
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
          <button className="text-1xl border-solid font-bold" type="submit" onClick={getDocuments}>Create post</button>
          <button className="text-1xl border-solid font-bold" type="submit" onClick={deletePost}>Delete post</button>
        </form>
        <form action={deletePost}></form>
      </div>
    </>
  );
}

export default Overview;

//   // const loginWithGoogle = async () => {
//   //   const credentials = await signInWithPopup(auth, googleProvider);
//   //   setCredentials(credentials);
//   //   console.log(credentials);
//   // }