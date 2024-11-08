// src/components/RegisterStudent.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterStudent({ history }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register/student', formData);
      alert('Student registration successful!');
      history.push('/login');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register as Student</button>
      </form>
      <p>
        Want to register as a club? <a href="/register/club">Register as Club</a>
      </p>
    </div>
  );
}

export default RegisterStudent;
