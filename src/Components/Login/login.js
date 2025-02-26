
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../Images/login-animation.json';
import welcomeanimation from '../Images/welcome-animation.json'; // Ensure correct path
import './login.css'; // Import the CSS file
import logo from "../Images/Logo-V.png"


const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
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
        const loginRoute = 'http://localhost:5001/api/users/login';

        const response = await axios.post(loginRoute, {
          email: formData.email,
          password: formData.password,
        });

        // Handle response for user and admin login
        const { token, userType } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType); // Store userType in localStorage
        setIsAuthenticated(true);
        setIsAdmin(userType === 'admin'); // Set isAdmin based on userType

        if (userType === 'admin') {
          navigate('/Admin');  // Redirect to Admin panel if user is admin
        } else {
          navigate('/Homepage'); // Redirect to Homepage for regular users
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

  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Existing login animation
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const welcomeOptions = {
    loop: true,
    autoplay: true,
    animationData: welcomeanimation, // New welcome animation
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
   <div className="login-container">
      <div className="login-logo-container">
        <img src={logo} alt="login-up-logo" className="login-logo-image" />
        <div className="login-logo-text">
          VerseCraft
        </div>
      </div>
      <Box className="login-flex-container">
        {/* Left Section: Welcome Animation */}
        <Box className="animation-section">
          {/* Removed Typography components and added Welcome Animation */}
          <Lottie
            options={welcomeOptions}
            height={300}
            width={300}
            style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
          />
          {/* Optional: Retain the existing login animation if desired */}
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} // Adjust margin as needed
          />
        </Box>

        {/* Right Section: Login Form */}
        <Box className="form-section">
          <Box
            sx={{
              boxShadow: 3,
              p: 3,
              borderRadius: 2,
              backgroundColor: '#fff',
            }}
          >
            <Typography  fontsize="20" fontFamily="Apple Color Emoji" variant="h4" component="h1" align="center" gutterBottom>
              Login
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e, false)}
            >
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                type="submit" // Changed to type="submit" for proper form submission
                onClick={(e) => handleSubmit(e, false)}
              >
                Log In as User
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
                onClick={(e) => handleSubmit(e, true)}
              >
                Log In as Admin
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link
                  to="/Signup"
                  style={{ textDecoration: 'none', color: '#1976d2' }}
                >
                  Signup here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
   </div>
  );
};

export default Login;
