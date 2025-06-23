import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
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

    const loginUrl = 'http://localhost:8000/login';

    axios.get(loginUrl, {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    })
      .then(response => {
        alert('Login successful!');
        console.log('Login successful:', response.data);
        sessionStorage.setItem("userdetails", JSON.stringify(response.data));
        window.location.href = "/Bot";
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('Login failed. Check your credentials.');
      });
  };


  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #0f0f0f, #1e1e1e)',
      backdropFilter: 'blur(8px)',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '20px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.6), inset 0 0 0.5px rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        maxWidth: '900px',
        height: '500px'
      }}>
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url("https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white'
          }}>
           
            <h2 style={{
            marginBottom: '24px',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '24px',
            textAlign: 'center'
          }}>
            Welcome Back
          </h2>
          
          </div>
        </div>
        
        <div style={{
          flex: 1,
          padding: '40px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#cccccc',
              fontSize: '14px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'background 0.3s ease, box-shadow 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                e.target.style.boxShadow = '0 0 0 2px #285eef66';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#cccccc',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '15px',
                outline: 'none',
                transition: 'background 0.3s ease, box-shadow 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                e.target.style.boxShadow = '0 0 0 2px #285eef66';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(145deg, #3264e6, #234ac6)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.3s',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.background = 'linear-gradient(145deg, #3f71ff, #285eef)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(145deg, #3264e6, #234ac6)';
            }}
          >
            Log In
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <a href="#" style={{
              color: '#a0c4ff',
              fontSize: '14px',
              textDecoration: 'none'
            }}>
              Use single sign-on
            </a>
            <br />
            <a href="#" style={{
              color: '#a0c4ff',
              fontSize: '14px',
              textDecoration: 'none'
            }}>
              Forgot password?
            </a>
          </div>
          
          <div style={{
            color: '#ccc',
            fontSize: '14px',
            marginTop: '12px',
            textAlign: 'center'
          }}>
            No account?{' '}
            <a href="/signup" style={{
              color: '#a0c4ff',
              textDecoration: 'none'
            }}>
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;