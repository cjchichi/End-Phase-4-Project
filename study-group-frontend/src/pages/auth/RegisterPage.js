import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleRegister = (token) => {
    
    console.log("Registered with token:", token);
    login(token);
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
