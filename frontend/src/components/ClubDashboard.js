// src/components/ClubDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClubDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get('/club/services', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setServices(res.data);
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h2>Your Services</h2>
      <a href="/club/add-service">Add Service</a>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} -{' '}
            <button onClick={() => toggleService(service.id)}>
              {service.active ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => removeService(service.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );

  async function toggleService(serviceId) {
    await axios.put(`/club/services/${serviceId}/toggle`, {}, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    // Refresh services list
  }

  async function removeService(serviceId) {
    await axios.delete(`/club/services/${serviceId}`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    // Refresh services list
  }
}

export default ClubDashboard;
