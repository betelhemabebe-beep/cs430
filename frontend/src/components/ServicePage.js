import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ServicePage() {
  const [service, setService] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in.');

        const res = await axios.get(`/student/services/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service details:', err);
        alert('Failed to fetch service details. Please log in again.');
      }
    };

    fetchService();
  }, [serviceId]);

  const placeOrder = async () => {
    if (!quantity || !location) {
      alert('Please provide both quantity and location.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in.');

      await axios.post(
        '/student/orders',
        { serviceId: service.id, quantity, location, additionalInfo },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Thank you for your order!');
      navigate('/student/orders');
    } catch (err) {
      console.error('Error placing order:', err);
      alert(err.response?.data?.error || 'An error occurred while placing the order.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <svg
          onClick={() => navigate(`/student/clubs/${service.club_id}/services`)}
          style={styles.backIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h2 style={styles.title}>{service.name}</h2>
      </div>
      <p style={styles.description}>{service.description}</p>
      <div style={styles.formGroup}>
        <label style={styles.label}>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter delivery location"
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Additional Information:</label>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any additional instructions?"
          style={styles.textarea}
        />
      </div>
      <button onClick={placeOrder} style={styles.orderButton}>
        Place Order
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
    background: 'linear-gradient(135deg,#510C76, #ffffff)',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
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
    left: '20px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#fff',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    color: '#800080',
    flex: 1,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '1.2em',
    textAlign: 'center',
    maxWidth: '600px',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#800080',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    minHeight: '80px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    outline: 'none',
  },
  orderButton: {
    padding: '10px 20px',
    backgroundColor: '#800080',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
  },
};

export default ServicePage;
