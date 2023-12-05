import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [alerta, setAlerta] = useState({ status: '', message: '' });

  const handleCreateAccount = async () => {
    try {
      console.log("Criando conta...");
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const responseData = await response.json(); // Extrair o JSON da resposta

      if (response.ok) {
        toast.success('Registro bem-sucedido!', { autoClose: 2000 });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        
        console.error('Erro ao criar a conta:', responseData.error || 'Erro desconhecido');
        toast.error('Registro falhou! '+responseData.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Erro ao criar a conta:', error);
      toast.error('Registro falhou!', { autoClose: 2000 });
    }
  };

  return (
    <div>
      <h2>Criar Conta</h2>
      
      <form>
        <label>Usuário:</label>
        <input name="username" aria-label="Usuário" type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        <br />

        <label>Email:</label>
        <input name="email" aria-label="E-mail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />

        <label>Password:</label>
        <input name="password" aria-label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />

        <button type="button" onClick={handleCreateAccount}>Criar Conta</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Faça login aqui</Link></p>
    </div>
  );
};

export default CreateAccountPage;
