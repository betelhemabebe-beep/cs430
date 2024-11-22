// src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/student/orders', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setOrders(res.data);
      } catch (err) {
        alert('Error fetching order history');
      }
    };
    fetchOrders();
  }, []);

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
        <h2 style={styles.title}>Your Order History</h2>
      </div>
      <div style={styles.orderList}>
        {orders.map((order) => (
          <div key={order.id} style={styles.orderCard}>
            <p><strong>Service:</strong> {order.service_name}</p>
            <p><strong>Club:</strong> {order.club_name}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Location:</strong> {order.location}</p>
            <p><strong>Additional Info:</strong> {order.additional_info}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backIcon: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#333',
    marginRight: '10px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  orderCard: {
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
};

export default OrderHistory;
