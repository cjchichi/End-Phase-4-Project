/*
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            login(data.user_id, data.access_token);
            navigate('/dashboard');
          } else {
            alert(data.message || 'Login failed');
          }
        })
        .catch(() => alert('Something went wrong'))
        .finally(() => setSubmitting(false));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>Login</button>
    </form>
  );
}
*/
/*
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; // optional: for external CSS

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            login(data.user_id, data.access_token);
            navigate('/dashboard');
          } else {
            alert(data.message || 'Login failed');
          }
        })
        .catch(() => alert('Something went wrong'))
        .finally(() => setSubmitting(false));
    }
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit} className="form-box">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="form-error">{formik.errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            className="form-input"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="form-error">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit" className="form-button" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
*

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
    else alert('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Login</button>
        </form>
      </div>
    </div>
  );
}
  *

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
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
import studyImage from '../assets/study.jpg'; // Replace with your actual image path

export default function LoginPage() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email, // Ensure this matches your backend
        password: formData.password    // Ensure this matches your backend
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed.');
    }

    const data = await res.json();
    // Check if the token is returned correctly
    if (data.access_token) { // Adjusted to access_token based on your Flask code
      setToken(data.access_token); // Store the token in context or local storage
      navigate('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError(err.message);
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

        {/* Right Panel (Login Form) */}
        <div className="col-md-6 bg-white p-5">
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold border-bottom border-primary pb-1">Login</span>
            <Link to="/register" className="text-decoration-none text-secondary">Register</Link>
          </div>

          <h4 className="mb-4 fw-bold">Welcome Back</h4>
          <p className="text-muted mb-4">Sign in to access your study groups and materials</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="your@email.com"
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

            <div className="mb-3 text-end">
              <a href="#" className="text-decoration-none">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

        