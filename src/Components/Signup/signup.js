
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'react-lottie';
import signupAnimationData from '../Images/signup-animation.json'; // Optional: Add a signup animation
import joinAnimation from "../Images/join-animation.json"
import logo from "../Images/Logo-V.png"
import './signup.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'Male', // Default to Male, you can change it as needed
    phone: '',
    description: '',
    profile: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

    // Capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.fullname.trim()) formErrors.fullname = 'Full name is required';
    if (!formData.email.trim()) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = 'Passwords do not match';
    if (!formData.age) formErrors.age = 'Age is required';
    if (!formData.phone.trim()) formErrors.phone = 'Phone number is required';
    return formErrors;
  };

  // Handle form submission and send data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Create a FormData object to handle file uploads
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('age', formData.age);
      data.append('gender', formData.gender);
      data.append('phone', formData.phone);
      data.append('description', formData.description);
      if (formData.profile) {
        data.append('profile', formData.profile);
      }

      try {
        const response = await axios.post('http://localhost:5001/api/users/signup', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        alert('Signup successful!');
        navigate('/login');
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setErrors({
          apiError: error.response && error.response.data.error
            ? error.response.data.error
            : 'An error occurred during signup',
        });
      }
    }
  };

  
  // Lottie animation options (optional)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signupAnimationData, // Optional: Add a signup animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // Lottie animation options (optional)
  const defaultOptions02 = {
    loop: true,
    autoplay: true,
    animationData: joinAnimation, // Optional: Add a signup animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };


  return (
    <div className="container-signup">
      {/* Background Circles */}

      <div className="signup-logo-container">
        <img src={logo} alt="sign-up-logo" className="signup-logo-image" />
        <div className="signup-logo-text">
          VerseCraft
        </div>
      </div>
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>
      <div className="background-circle circle3"></div>

      <Box
      display="flex"
      justifyContent="top" // Horizontal centering
      alignItems="start"    // Vertical centering
      height="100vh"         // Full viewport height
      width="100%"
      marginTop={"-100px"}
      Left={"10%"}
      position={"absolute"}

    >
      <Lottie
        options={defaultOptions02}
        height={200}
        width={200}
        aria-label="Join Animation"
        role="img"
      />
    </Box>

      <Lottie
          options={defaultOptions}
          height={550}
          width={800}
          style={{ marginBottom: '10px' }}
          aria-label="Signup Animation"
          role="img"
        /> 

      <Box className="signup-container-signup" right="5%" width="50%">
        {/* Optional: Add a Lottie animation for signup */}
       

        <Typography fontSize="20px" variant="h6" className="h2-signup" top={"-10px"} marginTop={"-30px"}>
          Signup
        </Typography>
        {errors.apiError && <Alert severity="error">{errors.apiError}</Alert>}

        <Box  component="form" onSubmit={handleSubmit} className="signup-form-signup" noValidate>
          {/* Full Name */}
          <TextField
            label="Full Name"
            name="fullname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.fullname}
            onChange={handleChange}
            error={Boolean(errors.fullname)}
            helperText={errors.fullname}
            required
            size="small"
            marginTop="-20px"

            sx={{
              
              '& .MuiInputBase-root': {
               
                fontSize: '0.8rem', // Adjust font size
                height: '35px', // Adjust height
                padding: '4px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
              },
            }}

          />

          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
            size="small"

            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '35px', // Adjust height
                padding: '4px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
              },
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            required
            size="small"

            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '35px', // Adjust height
                padding: '4px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
              },
            }}
          />

          {/* Confirm Password */}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            required
            size="small"

            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '35px', // Adjust height
                padding: '4px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
              },
            }}
          />

          {/* Age */}
          <TextField
            label="Age"
            name="age"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.age}
            onChange={handleChange}
            error={Boolean(errors.age)}
            helperText={errors.age}
            required
            size="small"

            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '35px', // Adjust height
                padding: '4px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
              },
            }}
          />

          {/* Gender */}
          <FormControl variant="outlined" fullWidth margin="normal" required
          
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.8rem', // Adjust font size
              height: '35px', // Adjust height
              padding: '4px 10px', // Adjust padding
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.8rem', // Adjust label font size
            },
          }}
          >
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            name="phone"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            required
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '40px', // Adjust height
                padding: '5px 10px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
                textAlign:"center",
              },
            }}
          />

          {/* Short Intro */}
          <TextField
            label="Short Intro"
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us something about yourself..."
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust font size
                height: '70px', // Adjust height
                padding: '4px 8px', // Adjust padding
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.8rem', // Adjust label font size
                textAlign:"center",
              },
            }}
          />

          {/* Upload Profile Picture */}
          <Box marginY={2}>
            <Button variant="contained" component="label" fullWidth>
              Upload Profile Picture
              <input
                type="file"
                hidden
                name="profile"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {formData.profile && (
              <Typography variant="body2" color="textSecondary" align="center" marginTop={1}>
                Selected File: {formData.profile.name}
              </Typography>
            )}
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="signup-btn-signup"
            disabled={isLoading}
            sx={{
              padding: '4px 4px', // Adjust padding
              fontSize: '0.75rem', // Adjust font size
              minWidth: '100px', // Adjust minimum width
            }}
            
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}

          </Button>
        </Box>

        <Typography variant="body2" className="p-signup">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Signup;
