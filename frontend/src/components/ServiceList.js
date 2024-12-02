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
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        alert('Error fetching services');
      }
    };
    fetchServices();
  }, [clubId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <svg
          onClick={() => navigate('/student/dashboard')}
          style={styles.backIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h2 style={styles.title}>Services</h2>
      </div>
      <div style={styles.serviceList}>
        {services.length === 0 ? (
          <p style={styles.message}>No services available for this club.</p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              style={styles.serviceCard}
              onClick={() => navigate(`/student/services/${service.id}`)}
            >
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  style={styles.serviceImage}
                />
              )}
              <h3 style={styles.serviceName}>{service.name}</h3>
              <h3 style={styles.servicePrice}>${service.price}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          ))
        )}
      </div>
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
    background: 'linear-gradient(to top,#510C76, #ffffff)',
    color: '#510C76',
    fontFamily: 'Quincy CF, sans-serif',
    padding: '20px',
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#000',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#510C76',
    flex: 1,
    textAlign: 'center',
  },
  serviceList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
  serviceCard: {
    width: '250px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    backgroundColor: '#000',
    color: '#800080',
    cursor: 'pointer',
    transform: 'transform 0.2s ease, scale(1.05)',
  },
  serviceImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  serviceName: {
    fontSize: '1.5em',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: '1.2em',
    color: '#800080',
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: '1em',
    color: '#fff',
  },
  message: {
    color: '#800080',
    fontSize: '1.2em',
  },
};

export default ServiceList;
