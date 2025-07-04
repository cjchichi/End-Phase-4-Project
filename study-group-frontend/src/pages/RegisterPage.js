/*
import React, { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => alert(data.message || 'User registered'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
*

import React, { useState } from 'react';
import '../App.css';

export default function RegisterForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('User registered successfully!');
          setForm({ username: '', email: '', password: '' });
        }
      })
      .catch(() => alert('Registration failed'));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Register</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            type="text"
            className="form-input"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
}
*

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) navigate('/dashboard');
    else alert('Registration failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Create Account</button>
        </form>
      </div>
    </div>
  );
}
*/
//bootsrap
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import studyImage from '../assets/study.jpg'; // Use same image as in login

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Add the fetch call here
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });
      // Check if the response is ok
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed.');
      }
      const data = await res.json();
      if (data.success) {
        // Assuming you have a setToken function to store the token
        setToken(data.token); // Store the token in context or local storage
        navigate('/dashboard'); // Navigate to the dashboard on successful registration
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message); // Set error message if the fetch fails
    }
  };
  
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg w-100" style={{ maxWidth: '900px' }}>
        {/* Left Panel */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4" style={{ backgroundColor: '#007bff' }}>
          <h2 className="mb-3" style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#c3f0ff' }}>Study</span><span style={{ color: '#e5c9ff' }}>Group</span>
          </h2>
          <p className="text-center">
            Join thousands of students collaborating and achieving academic success together.
          </p>
          <img src={studyImage} alt="Study group" className="img-fluid rounded my-3" />
          <div className="d-flex gap-3">
            <i className="bi bi-journal fs-3 text-white"></i>
            <i className="bi bi-pencil fs-3 text-white"></i>
            <i className="bi bi-lightbulb fs-3 text-white"></i>
          </div>
        </div>

        {/* Right Panel (Register Form) */}
        <div className="col-md-6 bg-white p-5">
          <div className="d-flex justify-content-between mb-3">
            <Link to="/login" className="text-decoration-none text-secondary">Login</Link>
            <span className="fw-bold border-bottom border-primary pb-1">Register</span>
          </div>

          <h4 className="mb-4 fw-bold">Create Your Account</h4>
          <p className="text-muted mb-4">Start your journey by joining a study group</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
