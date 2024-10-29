import React, { useState, useEffect } from 'react';
import './login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSubmit = async (e, isAdmin) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        // Call different API routes for Admin and User login
        // const loginRoute = isAdmin
        //   ? 'http://localhost:5001/api/admin/login'
        //   : 'http://localhost:5001/api/users/login';
        
          const loginRoute = isAdmin
          ?  navigate('/Admin')
          : 'http://localhost:5001/api/users/login';

        const response = await axios.post(loginRoute, {
          email: formData.email,
          password: formData.password,
        });

        console.log(response.data);

        // Store the token or other user data in localStorage or context
        localStorage.setItem('token', response.data.token);

        if (isAdmin) {
          // Navigate to Admin Dashboard
          navigate('/Admin');
        } else {
          // Navigate to User Homepage
          navigate('/Homepage');
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setErrorMessage(
          error.response && error.response.data.error
            ? error.response.data.error
            : 'An error occurred'
        );
      }
    }
  };

  // Generate particles on component mount
  useEffect(() => {
    const numParticles = 400; // Number of particles to generate
    const particleContainer = document.querySelector('.login-container');

    // Create particles and append to container
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}vw`; // Random starting horizontal position
      particle.style.animationDuration = `${5 + Math.random() * 5}s`; // Random animation duration
      particle.style.animationDelay = `${Math.random() * 5}s`; // Staggered delay
      particleContainer.appendChild(particle);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-container-message">
        <h2>Welcome Back! Please log in to continue</h2>
        <h2>Login</h2>
        {errorMessage && <p className="login-error-message">{errorMessage}</p>}
        <form className="login-form">
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="login-error">{errors.email}</p>}
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="login-error">{errors.password}</p>}
          </div>

          {/* Separate buttons for User and Admin login */}
          <div className="login-button-group">
            <button
              type="submit"
              className="login-container-login-btn"
              onClick={(e) => handleSubmit(e, false)} // Log in as User
            >
              Log In as User
            </button>
            <button
              type="submit"
              className="login-btn-admin-btn"
              onClick={(e) => handleSubmit(e, true)} // Log in as Admin
            >
              Log In as Admin
            </button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/Signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
