// src/components/RegisterClub.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterClub({ history }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    clubName: '',
    description: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register/club', formData);
      alert('Club registration successful! Please wait for admin approval.');
      history.push('/login');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Club Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="clubName" placeholder="Club Name" onChange={handleChange} required />
        <input name="contactEmail" type="email" placeholder="Contact Email" onChange={handleChange} required />
        <textarea name="description" placeholder="Club Description" onChange={handleChange} />
        <button type="submit">Register as Club</button>
      </form>
      <p>
        Want to register as a student? <a href="/register/student">Register as Student</a>
      </p>
    </div>
  );
}

export default RegisterClub;
