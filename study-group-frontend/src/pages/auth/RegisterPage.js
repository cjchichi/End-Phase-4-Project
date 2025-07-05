/*
import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = ({ onRegister }) => {
  return (
    <div className="container">
      <h2 className="text-center">Register</h2>
      <RegisterForm onRegister={onRegister} />
    </div>
  );
};

export default RegisterPage;
*/
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleRegister = (token) => {
    // Handle the registration token (e.g., save it to state or local storage)
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
