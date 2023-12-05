import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateAccountPage from './screens/CreateAccountPage.jsx';
import LoginPage from './screens/LoginPage.jsx';
import Home from './screens/Home.jsx';
import PrivateHome from './screens/PrivateHome.jsx'; // Importe o componente PrivateHome
import AddEditBookPage from './screens/AddEditBookPage.jsx';
import TokenController from './controller/TokenController.js';

const isAuthenticated = () => {
  return TokenController.getToken()!=null;
  };

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          {/* Adicione a rota PrivateHome e use Navigate para redirecionar se não estiver autenticado */}
          <Route
            path="/private-home"
            element={isAuthenticated() ? <PrivateHome /> : <Navigate to="/login" />}
          />
          <Route
/>

        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
