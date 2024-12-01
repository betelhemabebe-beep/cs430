import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubProfile() {
  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    contactEmail: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found. Please log in.');
        }
        const res = await axios.get('/club/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('description', profileData.description);
    formData.append('contactEmail', profileData.contactEmail);
    if (profileData.image) {
      formData.append('image', profileData.image);
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }
      await axios.put('/club/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <div style={styles.message}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <svg
          onClick={() => navigate('/club/dashboard')}
          style={styles.backIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h2 style={styles.header}>Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Club Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Club Name"
            value={profileData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={profileData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="contactEmail" style={styles.label}>Contact Email:</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            placeholder="Contact Email"
            value={profileData.contactEmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>Profile Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Save Changes</button>
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
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d9a7c7, #fffcdc)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: '20px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#fff',
  },
  header: {
    fontSize: '2.5em',
    color: '#800080',
    textAlign: 'center',
    flex: 1,
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#cbaacb',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
    color: '#800080',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: '1em',
    outline: 'none',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: '1em',
    outline: 'none',
    width: '100%',
    resize: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#800080',
    color: '#fff',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    color: '#800080',
    fontSize: '1.2em',
  },
};

export default ClubProfile;
