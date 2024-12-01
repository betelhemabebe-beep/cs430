import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = new FormData();
    serviceData.append('name', formData.name);
    serviceData.append('description', formData.description);
    serviceData.append('price', formData.price);
    if (formData.image) {
      serviceData.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }

      await axios.post('/club/services', serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Service added successfully!');
      navigate('/club/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to add service. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
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
      <h2 style={styles.header}>Add Service</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Service Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Service Name"
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
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="price" style={styles.label}>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Service</button>
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
    background: 'linear-gradient(135deg,#510C76, #ffffff)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#fff',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '40px',
    color: '#800080',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#cbaacb',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#800080',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    outline: 'none',
    fontSize: '1em',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    outline: 'none',
    fontSize: '1em',
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
};

export default AddService;
