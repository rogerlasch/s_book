import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, signInWithGoogle, signInWithGitHub, logout } from "../firebase.js";
import PrivateHome from "../telas/PrivateHome.jsx";

const Login = () => {
  const navigate = useNavigate();
  const handleLoginWithGitHub = async () => {
    try {
      
      await signInWithGitHub();
      navigate("/private-home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLoginWithGitHub}>Login com GitHub</button>
    </div>
  );
};

export default Login;
