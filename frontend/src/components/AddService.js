// src/components/AddService.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/club/services', formData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('Service added successfully!');
      navigate('/club/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Service Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} required />
        <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddService;
