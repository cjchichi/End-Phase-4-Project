import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
