import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (token) => {
    console.log("Logged in with token", token)
    navigate('/dashboard');
  }
  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
