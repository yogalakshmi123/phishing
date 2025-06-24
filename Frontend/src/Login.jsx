import React, { useState } from 'react';

import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [keepSignedIn, setKeepSignedIn] = useState(false);

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
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f7fa',
      margin: 0,
      padding: 20
    }}>
      <div style={{
        display: 'flex',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        maxWidth: '800px',
        width: '100%',
        minHeight: '500px'
      }}>
        {/* Left Panel */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px 40px',
          position: 'relative',
          color: 'white'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            {/* <div style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '8px',
              opacity: 0.9
            }}>
              WAVE INFRATECH
            </div> */}
            
            <div style={{
              fontSize: '14px',
              marginBottom: '40px',
              opacity: 0.8
            }}>
              Nice to see you again
            </div>
            
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              margin: 0,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              WELCOME BACK
            </h1>
          </div>
        </div>
        
        {/* Right Panel */}
        <div style={{
          flex: 1,
          padding: '60px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'white'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '40px',
            margin: '0 0 40px 0'
          }}>
            Login Account
          </h2>
          
          <div>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Username"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  background: '#f7fafc',
                  color: '#2d3748',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.background = '#edf2f7';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = '#f7fafc';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  background: '#f7fafc',
                  color: '#2d3748',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.background = '#edf2f7';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onBlur={(e) => {
                  e.target.style.background = '#f7fafc';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>
            
            <div style={{ 
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                style={{
                  marginRight: '10px',
                  width: '16px',
                  height: '16px',
                  accentColor: '#4facfe'
                }}
              /> */}
              <a href='/signup' 
                htmlFor="keepSignedIn"
                style={{
                  color: 'black',
                  textDecoration:"none",
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Dont have an  Account Create One?
              </a>
            </div>
            
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;