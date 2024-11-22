// src/components/ServiceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ServiceList() {
  const [services, setServices] = useState([]);
  const { clubId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`/student/clubs/${clubId}/services`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setServices(res.data);
      } catch (err) {
        alert('Error fetching services');
      }
    };
    fetchServices();
  }, [clubId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Services</h2>
      <div style={styles.serviceList}>
        {services.map((service) => (
          <div
            key={service.id}
            style={styles.serviceCard}
            onClick={() => navigate(`/student/services/${service.id}`)}
          >
            <h3 style={styles.serviceName}>{service.name}</h3>
            <h3 style={styles.servicePrice}>{service.price}</h3>
            <p style={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  title: { fontSize: '24px', textAlign: 'center' },
  serviceList: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' },
  serviceCard: { width: '200px', padding: '15px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', cursor: 'pointer' },
  serviceName: { fontSize: '18px', margin: '10px 0' },
  serviceDescription: { color: '#555' },
};

export default ServiceList;
