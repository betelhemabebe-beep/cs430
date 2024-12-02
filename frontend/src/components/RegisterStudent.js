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
    const emailRegex = /^[^@]+@truman\.edu$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please use a valid Truman email address (e.g., @truman.edu)');
      return;
    }
    try {
      const response = await axios.post('/auth/register/student', formData);
      alert('Student registration successful!');
      navigate('/login/student');
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
      <div style={styles.cardCentered}>
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
          Already have an account? <a href="/login/student" style={styles.link}>Log in</a>
        </p>
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
    color: '#510C76',
    fontFamily: 'Quincy CF, sans-serif',
    padding: '20px',
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
    width: '400px',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#000000',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#510C76',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#5e005e',
  },
  text: {
    marginTop: '15px',
    color: '#fff',
  },
  link: {
    color: '#510C76',
    textDecoration: 'none',
  },
};

export default RegisterStudent;
