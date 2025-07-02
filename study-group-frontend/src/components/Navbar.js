/*
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#e1e1e1' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
      <Link to="/groups" style={{ marginRight: '1rem' }}>Groups</Link>
      <Link to="/create-group" style={{ marginRight: '1rem' }}>Create Group</Link>
      <Link to="/my-groups" style={{ marginRight: '1rem' }}>My Groups</Link>
      <Link to="/register" style={{ marginRight: '1rem' }}>Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/" onClick={() => {localStorage.removeItem("token");localStorage.removeItem("user_id");}}>Logout</Link>

    </nav>
  );
}
*/

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears localStorage + context
    navigate('/login'); // redirect to login page
  };

  return (
    <nav style={{ padding: '1rem', background: '#e1e1e1' }}>
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
