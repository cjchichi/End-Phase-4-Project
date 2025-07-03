/*
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav style={{ padding: '1rem', background: 'green' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
      <Link to="/groups" style={{ marginRight: '1rem' }}>Groups</Link>
      <Link to="/create-group" style={{ marginRight: '1rem' }}>Create Group</Link>
      <Link to="/my-groups" style={{ marginRight: '1rem' }}>My Groups</Link>
      
      {!userId ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}
*/

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; // Make sure this file exists

export default function Navbar() {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">StudyHub</Link>
        <Link to="/groups">Groups</Link>
        {userId && (
          <>
            <Link to="/create-group">Create Group</Link>
            <Link to="/my-groups">My Groups</Link>
          </>
        )}
      </div>
      <div className="nav-right">
        {!userId ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
