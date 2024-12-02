import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//Kamsi
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
      <div style={styles.cardCentered}>
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
    background: 'linear-gradient(to top,#510C76, #ffffff)',
    fontFamily: 'Quincy CF, sans-serif',
    padding: '20px',
    color: '#510C76',
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
    color: '#000',
  },
  cardCentered: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#000000',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
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
  },
  input: {
    padding: '10px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '10px',
    backgroundColor: '#800080',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
  },
};

export default StudentLogin;
