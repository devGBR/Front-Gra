import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import Login from './Pages/Login'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'





const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  // Função para verificar se o token ainda é válido
  const checkTokenValidity = () => {
    // Verificar se o token está presente no localStorage
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      // Aqui você pode fazer uma requisição ao servidor para verificar se o token é válido
      // Por simplicidade, vamos apenas verificar se o token ainda existe no localStorage
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      // Token inválido ou não encontrado, fazer logout do usuário
      setToken('');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // Verificar o token periodicamente (por exemplo, a cada 5 minutos)
    const interval = setInterval(() => {
      
      checkTokenValidity();
    }, 5 * 60 * 1000);
    checkTokenValidity()
    // Quando o componente é desmontado, limpar o intervalo
  clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <App logged={isLoggedIn}/> : <Login />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

// Mantenha a renderização usando ReactDOM.createRoot()
ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />);
