import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClubPage({ match }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`/student/clubs/${match.params.clubId}/services`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        alert('Failed to fetch services. Please try again.');
      }
    };
    fetchServices();
  }, [match.params.clubId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Services</h2>
      <ul style={styles.serviceList}>
        {services.map((service) => (
          <li key={service.id} style={styles.serviceItem}>
            <a href={`/student/services/${service.id}`} style={styles.link}>
              {service.name}
            </a>
          </li>
        ))}
      </ul>
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
    background: 'linear-gradient(135deg,#510C76, #ffffff)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#800080',
  },
  serviceList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  serviceItem: {
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '12px',
    backgroundColor: '#cbaacb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#800080',
    fontSize: '1.2em',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
};

export default ClubPage;
