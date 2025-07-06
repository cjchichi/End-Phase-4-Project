import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleLogin = (token) => {
    console.log("Logged in with token", token)
    login (token, user);
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
