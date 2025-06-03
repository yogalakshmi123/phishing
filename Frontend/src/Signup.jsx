import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const signupUrl = 'https://your-api-url.com/signup'; // Replace with your real endpoint

    axios.post(signupUrl, {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
    .then(response => {
      console.log('Signup successful:', response.data);
      alert('Account created successfully!');
    })
    .catch(error => {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div>
        <label>Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
