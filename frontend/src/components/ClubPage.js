// src/components/ClubPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClubPage({ match }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(`/student/clubs/${match.params.clubId}/services`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setServices(res.data);
    };
    fetchServices();
  }, [match.params.clubId]);

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <a href={`/student/services/${service.id}`}>{service.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubPage;
