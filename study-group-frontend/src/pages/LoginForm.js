
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
      fetch('http://localhost:5000/api/login', {
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
