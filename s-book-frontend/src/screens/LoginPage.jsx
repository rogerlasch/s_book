import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TokenController from '../controller/TokenController.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log("Fazendo login...");
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      
      const responseData = await response.json(); // Extrair o JSON da resposta

      if (response.status===200) {
        // Login bem-sucedido
        const token = responseData.token;
        TokenController.saveToken(token); // Salvar o token no localStorage ou onde preferir
        toast.success('Login bem-sucedido!', { autoClose: 2000 });
        navigate('/private-home');
      } else {
        // Alguma coisa deu errado
        console.error('Erro ao fazer login:', responseData.error || 'Erro desconhecido');
        toast.error('Login falhou! ' + responseData.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Login falhou!', { autoClose: 2000 });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input name="email" aria-label="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <label>Password:</label>
        <input name="password" aria-label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <p>Não tem uma conta? <Link to="/create-account">Crie uma conta aqui</Link></p>
    </div>
  );
};

export default LoginPage;
