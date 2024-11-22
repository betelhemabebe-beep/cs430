// src/components/ClubOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClubOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/club/orders', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  const confirmOrder = async (orderId) => {
    try {
      await axios.put(`/club/orders/${orderId}/confirm`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'completed' } : order));
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.service_name} by {order.student_username} - Status: {order.status}
            {order.status === 'requested' && (
              <button onClick={() => confirmOrder(order.id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClubOrders;
