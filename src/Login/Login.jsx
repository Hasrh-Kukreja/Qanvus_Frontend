import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Logged in!');
      window.location.href = '/Product';
    } else {
      setErrors(newErrors);
    }
  };
  const handleForgotPasswordClick = () => {
   
    window.location.href = '/forgot-password'; 
  };
  return (
    <div className="container mt-5">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="mt-3">
        <button
          className="btn btn-link"
          onClick={handleForgotPasswordClick}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;
