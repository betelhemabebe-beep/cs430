// src/components/ServicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ServicePage({ match }) {
  const [service, setService] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchService = async () => {
      const res = await axios.get(`/student/services/${match.params.serviceId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setService(res.data);
    };
    fetchService();
  }, [match.params.serviceId]);

  const placeOrder = async () => {
    try {
      await axios.post(
        '/student/orders',
        { serviceId: service.id, quantity },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Order placed successfully!');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default ServicePage;
