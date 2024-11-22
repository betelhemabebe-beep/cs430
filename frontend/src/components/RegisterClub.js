// src/components/RegisterClub.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterClub() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    clubName: '',
    contactEmail: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);

    try {
      if (!formData.username || !formData.password || !formData.clubName || !formData.contactEmail) {
        alert('All required fields must be filled out.');
        return;
      }

      await axios.post('/auth/register/club', formData);
      alert('Club registration successful! Await admin approval.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Club Registration</h2>
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
          <input
            name="clubName"
            placeholder="Club Name"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="contactEmail"
            type="email"
            placeholder="Contact Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="description"
            placeholder="Club Description"
            onChange={handleChange}
            style={styles.textarea}
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
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    minHeight: '80px',
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

export default RegisterClub;
