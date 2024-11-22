// src/components/ClubDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubDashboard() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get('/club/services', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setServices(res.data);
    };
    fetchServices();
  }, []);

  const handleAddService = () => {
    navigate('/club/add-service');
  };

  const handleOrders = () => {
    navigate('/club/orders');
  };

  const handleProfile = () => {
    navigate('/club/profile');
  };

  return (
    <div>
      <h2>Club Dashboard</h2>
      <button onClick={handleOrders}>View Orders</button>
      <button onClick={handleProfile}>Edit Profile</button>
      <h3>Current Services</h3>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
      <button onClick={handleAddService}>Add Service</button>
    </div>
  );
}

export default ClubDashboard;
