import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import studyImage from '../../assets/images/study.jpg'; 
const LoginForm = ({ onLogin }) => {
  const [error, setError] = useState('');


  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(''); 
      try {
        console.log("Login values:", values); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData); 
          throw new Error(errorData.message || 'Login failed.');
        }

        const data = await response.json();
        console.log("Login response:", data); 
        onLogin(data.access_token, {id: data.user_id}); 
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
          <p className="text-center">
            Join thousands of students collaborating and achieving academic success together.
          </p>
          {/* Image added here */}
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

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                }`}
                placeholder="your@email.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
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
                className={`form-control ${
                  formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
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

export default LoginForm;
