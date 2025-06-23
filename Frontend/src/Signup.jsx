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
        maxWidth: '1000px',
        height: '600px'
      }}>
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '45px',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url("https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
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
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '8px',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              Join Our Community
            </h3>
            <p style={{
              fontSize: '16px',
              fontWeight: 300,
              opacity: 0.9,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              margin: 0
            }}>
              Start Your Journey Today
            </p>
          </div>
        </div>
        
        <div style={{
          flex: 1,
          padding: '45px 35px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <h2 style={{
            marginBottom: '24px',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: '24px',
            textAlign: 'center'
          }}>
            Create Account
          </h2>
          
          <div style={{ width: '100%', marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              color: '#cccccc',
              fontSize: '14px'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
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
          
          <div style={{ width: '100%', marginBottom: '18px' }}>
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
              value={formData.email}
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
          
          <div style={{ width: '100%', marginBottom: '18px' }}>
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
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
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
              marginTop: '10px',
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
            Sign Up
          </button>
          
          <div style={{
            color: '#ccc',
            fontSize: '14px',
            marginTop: '12px',
            textAlign: 'center'
          }}>
            Already have an account?{' '}
            <a href="/login" style={{
              color: '#a0c4ff',
              textDecoration: 'none'
            }}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;