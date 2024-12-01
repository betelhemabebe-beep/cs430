import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login/student', { ...formData });
      localStorage.setItem('token', res.data.token);
      navigate('/student/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.arrowContainer} onClick={() => navigate('/register/student')}>
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
      <h2 style={styles.title}>Student Login</h2>
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d9a7c7, #fffcdc)',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    color: '#fff',
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
    color: '#fff',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#800080',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#cbaacb',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#800080',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
  },
};

export default StudentLogin;
