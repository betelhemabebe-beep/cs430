import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubName, setClubName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubInfo();
    fetchServices();
  }, []);

  const fetchClubInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/club/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClubName(res.data.name);
    } catch (err) {
      console.error('Error fetching club info:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token is missing. Please log in.');
      }
      const response = await axios.get('/club/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err.message);
      setError(err.response?.data?.error || 'Failed to fetch services');
      if (err.response?.status === 401) {
        alert('Unauthorized! Redirecting to login.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/club/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Service removed successfully!');
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err.message);
      alert(err.response?.data?.error || 'Failed to delete service');
    }
  };

  const handleAddService = () => navigate('/club/add-service');
  const handleOrders = () => navigate('/club/orders');
  const handleProfile = () => navigate('/club/profile');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <p style={styles.message}>Loading services...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.welcome}>Welcome, {clubName}</h2>
      </div>
      <div style={styles.middleSection}>
        <div style={styles.buttonGroup}>
          <button onClick={handleOrders} style={styles.button}>
            View Orders
          </button>
          <button onClick={handleProfile} style={styles.button}>
            Edit Profile
          </button>
        </div>
        <h3 style={styles.subHeader}>Current Services</h3>
        {services.length === 0 ? (
          <p style={styles.message}>No services available</p>
        ) : (
          <ul style={styles.serviceList}>
            {services.map((service) => (
              <li key={service.id} style={styles.serviceItem}>
                <span>{service.name}</span>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteService(service.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleAddService} style={styles.addButton}>
          Add Service
        </button>
      </div>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
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
    background: 'linear-gradient(135deg, #d9a7c7, #fffcdc)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    position: 'relative',
  },
  header: {
    width: '100%',
    padding: '20px',
    marginBottom: '30px',
    textAlign: 'left',
  },
  welcome: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#800080',
  },
  middleSection: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#800080',
    color: '#fff',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  subHeader: {
    fontSize: '1.8em',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#800080',
  },
  serviceList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '800px',
  },
  serviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '8px',
    margin: '10px 0',
    backgroundColor: '#cbaacb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  deleteButton: {
    backgroundColor: '#4b0082',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  addButton: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#800080',
    color: '#fff',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
  },
  message: {
    color: '#800080',
    fontSize: '1.2em',
  },
};

export default ClubDashboard;
