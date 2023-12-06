
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./login/login.jsx";
import Home from "./telas/Home.jsx";
import PrivateHome from "./telas/PrivateHome.jsx";


const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/private-home" element={<PrivateHome/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );

};

export default App;
