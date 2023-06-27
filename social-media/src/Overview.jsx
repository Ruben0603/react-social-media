import Header from "./includes/Header";
import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, updateDoc, deleteDoc, arrayUnion, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./style/App.css";
import { db, auth } from "./config/firebase";
import images from "./images/gymbackground.avif";

function Overview() {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getDate, setDate] = useState("");
  const [getAuthor, setAuthor] = useState("");
  const [user, setUser] = useState(null);
  const [getPost, setPosts] = useState([]);
  const [postMessage] = useState([]);
  const [credentials, setCredentials] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State voor de zoekterm

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const documentList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(documentList);

      return onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          console.log("Wel user");
        } else {
          setUser(null);
          console.log("Geen user");
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Get documents
  const getDocuments = () => {
    const q = query(collection(db, "posts"));
    getDocs(q).then((firebaseResponse) => {
      const documentList = firebaseResponse.docs.map((doc) => doc.data());
      setPosts(documentList);
    });
  };

  // Create posts
  const createPost = async () => {
    if (getTitle && getDescription && getDate) {
      await addDoc(collection(db, "posts"), {
        title: getTitle,
        description: getDescription,
        date: getDate,
        author: { name: user?.displayName || "Unknown", id: user?.uid || "Unknown" },
      });
    } else {
      console.log("Missing required fields");
    }
  };

  // Delete posts
  const deletePost = async (id) => {
    const postDeleteDoc = doc(db, "posts", id);
    await deleteDoc(postDeleteDoc);
  };

  // Filter the posts based on the search term
  const filterPosts = (posts, searchTerm) => {
    if (!searchTerm) {
      return posts; // Return all posts if no search term provided
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return posts.filter((post) => {
      const lowerCaseTitle = post.title.toLowerCase();
      const lowerCaseDescription = post.description.toLowerCase();

      return (
        lowerCaseTitle.includes(lowerCaseSearchTerm) ||
        lowerCaseDescription.includes(lowerCaseSearchTerm)
      );
    });
  };

  // Event handler for changing the search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the posts based on the search term
  const filteredPosts = filterPosts(getPost, searchTerm);

  // Render the filtered posts
  const renderedPosts = filteredPosts.map((post) => (
    <div className="flex justify-center flex-col" key={post.id}>
      <div className="flex flex-col justify-center mt-2">
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <p>{post.date}</p>
        {/*<p>{post.author}</p>*/}
        <p>{post.author.name}</p>
        <p>{post.author.id}</p>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-lg font-bold bg-blue-300 p-1 mr-2"
          onClick={() => like(post.id)}
        >
          Like
        </button>
        <button
          className="rounded-lg font-bold bg-blue-300 p-1"
          type="submit"
          onClick={() => deletePost(post.id)}
        >
          Delete post
        </button>
      </div>
    </div>
  ));

  // Functie om posts te kunnen liken
  const like = async (postId) => {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, { likes: arrayUnion(credentials?.user?.uid) });

    getDocuments();
  };

  return (
    <>
      <Header/>
      <h1 className="flex justify-center mt-8 mb-8">Home</h1>
      <div className="flex justify-center">
        <div className="image-container">
          <img src={images} alt="" />
        </div>
        <div className="flex">
          <div className="bg-slate-200 p-8 m-4">
            <h1 className="flex justify-center mt-2 mb-8">Show posts</h1>
            <label className="flex justify-start">Search</label>
            <input
              className="rounded-md border border-2 border-slate-500"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {renderedPosts}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-slate-200 p-8 m-4">
            <h1 className="mt-2 mb-4 flex justify-center">Create a post</h1>
            <div className="flex justify-center max-h-8">
              <form>
                <div>
                  <label className="flex justify-start">Title</label>
                  <input
                    className="rounded-md border border-2 border-slate-500"
                    type="text"
                    id="title"
                    placeholder="Title..."
                    value={getTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mt-2 flex justify-start">Description</label>
                  <textarea
                    className="rounded-md border border-2 border-slate-500"
                    id="description"
                    value={getDescription}
                    placeholder="Description..."
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label className="mt-2 flex justify-start">Date</label>
                  <input
                    className="rounded-md border border-2 border-slate-500"
                    type="date"
                    id="date"
                    value={getDate}
                    placeholder="Date..."
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mt-2 flex justify-start">Author</label>
                  <input
                    className="rounded-md border border-2 border-slate-500"
                    type="text"
                    id="author"
                    value={getAuthor}
                    placeholder="Author..."
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <button
                  className="rounded-lg font-bold bg-blue-300 p-1 mt-2"
                  type="submit"
                  onClick={createPost}
                >
                  Create post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
