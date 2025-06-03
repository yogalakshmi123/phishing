import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = 'https://your-api-url.com/login'; // Replace with actual login endpoint

    axios.post(loginUrl, credentials)
      .then(response => {
        console.log('Login successful:', response.data);
        alert('Login successful!');
        // redirect or set user session/token here
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Login failed. Check your credentials.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label>Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
