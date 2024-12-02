import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterClub() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requesterName: '',
    password: '',
    clubName: '',
    contactEmail: '',
    description: '',
    clubImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, clubImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contactEmail.endsWith('@truman.edu')) {
      alert('Contact email must end with @truman.edu');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('requesterName', formData.requesterName);
    formDataToSubmit.append('clubName', formData.clubName);
    formDataToSubmit.append('password', formData.password);
    formDataToSubmit.append('contactEmail', formData.contactEmail);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('clubImage', formData.clubImage);

    try {
      await axios.post('/auth/register/club', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Club registration successful! Await admin approval.');
      navigate('/login/club');
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
        <h2 style={styles.title}>Club Registration</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="requesterName"
            placeholder="Requester Name"
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
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="contactEmail"
            type="email"
            placeholder="Contact Email (must end with @truman.edu)"
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
          <input
            type="file"
            name="clubImage"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.text}>
          Already have an account? <a href="/login/club" style={styles.link}>Log in</a>
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
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to top,#510C76, #ffffff)',
    fontFamily: 'Quincy CF, sans-serif',
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
    color: '#000',
  },
  card: {
    width: '400px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#000000',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#800080',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
    minHeight: '80px',
    resize: 'none',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#800080',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  text: {
    marginTop: '15px',
    color: '#fff',
  },
  link: {
    color: '#800080',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default RegisterClub;
