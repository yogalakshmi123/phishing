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

    const signupUrl = 'http://localhost:8000/signup';

    axios.get(signupUrl, {
      params: {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }
    })
      .then(response => {
        alert('Account created successfully!');
        console.log('Signup successful:', response.data);
        sessionStorage.setItem("userid", response.data.id);
        window.location.href = "/details";
      })
      .catch(error => {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
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
        maxWidth: '900px',
        width: '100%',
        minHeight: '600px'
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
          
            <div style={{
              fontSize: '14px',
              marginBottom: '40px',
              opacity: 0.8
            }}>
              Join our community today
            </div>
            
            <h1 style={{
              fontSize: '40px',
              fontWeight: '700',
              margin: 0,
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              CREATE YOUR
            </h1>
            <h1 style={{
              fontSize: '40px',
              fontWeight: '700',
              margin: 0,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              ACCOUNT
            </h1>
            
            <p style={{
              fontSize: '16px',
              opacity: 0.8,
              marginTop: '20px',
              margin: '20px 0 0 0'
            }}>
              Start your journey with us
            </p>
          </div>
        </div>
        
        {/* Right Panel */}
        <div style={{
          flex: 1,
          padding: '50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'white'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '30px',
            margin: '0 0 30px 0'
          }}>
            Sign Up
          </h2>
          
          <div>
            <div style={{ marginBottom: '18px' }}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
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
            
            <div style={{ marginBottom: '18px' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
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
            
            <div style={{ marginBottom: '18px' }}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
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
            
            <div style={{ marginBottom: '25px' }}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
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
                fontFamily: 'inherit',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              SIGN UP
            </button>
            
            <div style={{
              color: '#718096',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Already have an account?{' '}
              <a href="/" style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;