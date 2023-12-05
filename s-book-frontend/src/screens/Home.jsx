import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Biblioteca Virtual</h1>
      <p>Bem-vindo à Biblioteca Virtual. Por favor, faça login ou crie uma conta.</p>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create-account">Criar Conta</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
