// src/components/OrderPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function OrderPage() {
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/student/services/${serviceId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
      }
    };
    fetchService();
  }, [serviceId]);

  const handleOrder = async () => {
    if (!quantity || !location) {
      alert('Please provide both quantity and location');
      return;
    }
    try {
      await axios.post(
        '/student/orders',
        { serviceId: service.id, quantity, location, additionalInfo },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Thank you for your order!');
      setTimeout(() => navigate('/student/orders'), 5001);
    } catch (err) {
      console.error('Error placing order:', err);
      alert(err.response?.data?.error || 'An error occurred while placing the order');
    }
  };

  return (
    <div>
      <h2>Order {service.name}</h2>
      <p>{service.description}</p>

      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </div>

      <div>
        <label>Additional Information:</label>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Additional Information"
        />
      </div>

      <button onClick={handleOrder}>Submit Order</button>
    </div>
  );
}

export default OrderPage;
