// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login({ history }) {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'student' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      if (formData.role === 'student') history.push('/student/dashboard');
      else if (formData.role === 'club') history.push('/club/dashboard');
      else if (formData.role === 'admin') history.push('/admin/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="club">Club</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? Register as{' '}
        <a href="/register/student">Student</a> or <a href="/register/club">Club</a>.
      </p>
    </div>
  );
}

export default Login;
