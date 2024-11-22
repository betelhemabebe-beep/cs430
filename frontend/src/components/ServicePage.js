// src/components/ServicePage.js
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
        const res = await axios.get(`/student/services/${serviceId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setService(res.data);
      } catch (err) {
        alert('Error fetching service details');
      }
    };
    fetchService();
  }, [serviceId]);

  const placeOrder = async () => {
    try {
      await axios.post(
        '/student/orders',
        { serviceId: service.id, quantity, location, additionalInfo },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Thank you for your order!');
      navigate('/student/orders');
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred while placing the order');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{service.name}</h2>
      <p style={styles.description}>{service.description}</p>
      <div style={styles.formGroup}>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter delivery location"
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label>Additional Information:</label>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any additional instructions?"
          style={styles.textarea}
        />
      </div>
      <button onClick={placeOrder} style={styles.orderButton}>Place Order</button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '500px', margin: 'auto' },
  title: { fontSize: '24px', marginBottom: '10px' },
  description: { color: '#555', marginBottom: '20px' },
  formGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '10px', fontSize: '16px' },
  textarea: { width: '100%', padding: '10px', fontSize: '16px', minHeight: '80px' },
  orderButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default ServicePage;
