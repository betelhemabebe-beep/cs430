// src/components/RegisterStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register/student', formData);
      alert('Student registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrowContainer} onClick={() => navigate('/')}>
        <svg
          style={styles.arrowIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Registration</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.text}>
          Already have an account? <a href="/login" style={styles.link}>Log in</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    cursor: 'pointer',
  },
  arrowIcon: {
    width: '24px',
    height: '24px',
    color: '#333',
  },
  card: {
    width: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  text: {
    marginTop: '15px',
    color: '#777',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default RegisterStudent;
