import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

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

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
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

  return (
    <div className="container-signup">
      <div className="signup-container-signup">
        <h2 className="h2-signup">Signup</h2>
        {errors.apiError && <p className="error-signup">{errors.apiError}</p>}
        <form onSubmit={handleSubmit} className="signup-form-signup">
          <div className="input-group-signup">
            <label className="label-signup" htmlFor="fullname">Full Name</label>
            <input
              className="input-signup"
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            {errors.fullname && <p className="error-signup">{errors.fullname}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="email">Email</label>
            <input
              className="input-signup"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-signup">{errors.email}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="password">Password</label>
            <input
              className="input-signup"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-signup">{errors.password}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-signup"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error-signup">{errors.confirmPassword}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="age">Age</label>
            <input
              className="input-signup"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <p className="error-signup">{errors.age}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="gender">Gender</label>
            <select
              className="input-signup"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error-signup">{errors.gender}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="phone">Phone Number</label>
            <input
              className="input-signup"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error-signup">{errors.phone}</p>}
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="description">Short Intro</label>
            <textarea
              className="input-signup"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us something about yourself..."
            />
          </div>

          <div className="input-group-signup">
            <label className="label-signup" htmlFor="profile">Upload Profile Picture</label>
            <input
              className="input-signup"
              type="file"
              id="profile"
              name="profile"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="signup-btn-signup">Sign Up</button>
        </form>
        <p className="p-signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
