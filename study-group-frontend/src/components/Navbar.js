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
*

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
*

// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold text-green-600">StudyGroup</Link>
      <div className="space-x-4 text-sm">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline text-gray-700">Dashboard</Link>
            <Link to="/groups" className="hover:underline text-gray-700">Groups</Link>
            <Link to="/my-groups" className="hover:underline text-gray-700">My Groups</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-600 text-white px-4 py-1.5 rounded-xl hover:bg-green-700">Login</Link>
            <Link to="/register" className="border border-green-600 text-green-600 px-4 py-1.5 rounded-xl hover:bg-green-50">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
  */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">StudyGroups</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {token ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/groups">Groups</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-groups">My Groups</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Hi, {currentUser?.username}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-2">Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

