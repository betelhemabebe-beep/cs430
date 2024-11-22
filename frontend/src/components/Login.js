// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Login({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: '', password: '', role: role || 'student' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      if (formData.role === 'student') navigate('/student/dashboard');
      else if (formData.role === 'club') navigate('/club/dashboard');
      else if (formData.role === 'admin') navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  // Determine the previous page based on location state or default to student signup
  const handleBackClick = () => {
    if (location.state?.from === 'RegisterClub') {
      navigate('/register/club');
    } else {
      navigate('/register/student');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrowContainer} onClick={handleBackClick}>
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
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Username"
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
          <select
            name="role"
            onChange={handleChange}
            defaultValue={role || 'student'}
            style={styles.select}
          >
            <option value="student">Student</option>
            <option value="club">Club</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Login</button>
        </form>
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
  select: {
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
};

export default Login;
