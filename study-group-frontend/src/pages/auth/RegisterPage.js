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
