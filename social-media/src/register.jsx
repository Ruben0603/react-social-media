import { Auth } from "./auth";
import Header from "./includes/Header";

function Register() {
     
    return (
      <>
        <div className="App">
        <Header/>
          <Auth />
        </div>
      </>
    )
  }
  
  export default Register;

// import Header from "./includes/Header";
// import React, { useState } from "react";
// import "./style/App.css";
// import Login from "./Login";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./config/firebase.js";
// import { Link } from "react-router-dom";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registerComplete, setRegisterComplete] = useState("");

//   const handleRegister = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Registration successful
//         const user = userCredential.user;
//         console.log("Registered user:", user);
//         setRegisterComplete("Registration successful");
//       })
//       .catch((error) => {
//         // Registration failed
//         const errorMessage = error.message;
//         console.log("Registration error:", errorMessage);
//         setRegisterComplete(errorMessage);
//       });
//   };

//   return (
//     <>
//       <Header/>
//       <div className="flex items-center flex-col justify-center">
//         <div className="flex items-center flex-col justify-center space-y-4 h-80">
//           <div className="registerLeft">
//             <div className="flex items-center space-y-2 flex-col justify-center">
//               <h3 className="text-3xl font-bold mt-8">Social Media</h3>
//               <span className="registerDesc">
//                 Connect with friends and the world around you on Social Media.
//               </span>
//             </div>
//           </div>
//           <div className="space-y-2 ">
//             <div className="flex space-y-2 items-center flex-col">
//               <label className="mt-2 flex justify-start">Email</label>
//               <input
//                 placeholder="Email"
//                 type="email"
//                 className="w-64 pl-1 rounded-md border border-2 border-slate-500 m-0.5"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label className="mt-2 flex justify-start">Password</label>
//               <input
//                 placeholder="Password"
//                 type="password"
//                 className="w-64 pl-1 rounded-md border border-2 border-slate-500 m-0.5"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-center mt-2">
//             <Link to="/login" message="">
//               <button
//                 className="w-20 p-1 bg-blue-400 rounded-lg font-bold"
//                 onClick={handleRegister}
//               >
//                 Register
//               </button>
//             </Link>
//             </div>

//             <p className="flex justify-center mt-20">Don't have an account:</p>
//             <div className="flex justify-center">
//               <Link to="/login">
//                 <button
//                   className="flex justify-center mt-2 w-20 p-1 bg-green-500 rounded-lg font-bold"
//                   onClick={Login}
//                 >
//                   Login
//                 </button>
//               </Link>
//             </div>
//             {registerComplete && <p>{registerComplete}</p>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;
