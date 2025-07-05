/*
import React, { useState } from 'react';
import '../../assets/images/study.jpg';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      const data = await response.json();
      onRegister(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };
/*
  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
};
*

 return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg w-100" style={{ maxWidth: '900px' }}>
        {/* Left Panel *}
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

        {/* Right Panel (Register Form) *}
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

export default RegisterForm;
*


import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link for navigation
import studyImage from '../../assets/images/study.jpg'; // Import the image

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      const data = await response.json();
      onRegister(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg w-100" style={{ maxWidth: '900px' }}>
        {/* Left Panel *}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4" style={{ backgroundColor: '#007bff' }}>
          <h2 className="mb-3" style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#c3f0ff' }}>Study</span><span style={{ color: '#e5c9ff' }}>Group</span>
          </h2>
          <p className="text-center">
            Join thousands of students collaborating and achieving academic success together.
          </p>
          {/* Image added here *}
          <img src={studyImage} alt="Study group" className="img-fluid rounded my-3" />
          <div className="d-flex gap-3">
            <i className="bi bi-journal fs-3 text-white"></i>
            <i className="bi bi-pencil fs-3 text-white"></i>
            <i className="bi bi-lightbulb fs-3 text-white"></i>
          </div>
        </div>

        {/* Right Panel (Register Form) *}
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
                value={username} // Use username state directly
                onChange={(e) => setUsername(e.target.value)} // Update state on change
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={email} // Use email state directly
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={password} // Use password state directly
                onChange={(e) => setPassword(e.target.value)} // Update state on change
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

export default RegisterForm;
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import studyImage from '../../assets/images/study.jpg';

const RegisterForm = ({ onRegister }) => {
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed.');
        }

        const data = await response.json();
        console.log("Registration response:", data); // Log the response
        onRegister(data.access_token); // Ensure onRegister is a function
      } catch (err) {
        setError(err.message);
      }
    }
  });

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg w-100" style={{ maxWidth: '900px' }}>
        {/* Left Panel */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4" style={{ backgroundColor: '#007bff' }}>
          <h2 className="mb-3" style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#c3f0ff' }}>Study</span><span style={{ color: '#e5c9ff' }}>Group</span>
          </h2>
          <p className="text-center">Join thousands of students collaborating and achieving academic success together.</p>
          <img src={studyImage} alt="Study group" className="img-fluid rounded my-3" />
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

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="invalid-feedback">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
