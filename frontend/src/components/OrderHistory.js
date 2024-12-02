import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          navigate('/login');
          return;
        }
        const res = await axios.get('/student/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err.response ? err.response.data : err);
        alert('Error fetching order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.arrowContainer} onClick={() => navigate('/student/dashboard')}>
          <svg
            style={styles.arrowIcon}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <h2 style={styles.title}>Your Order History</h2>
      </div>
      <div style={styles.orderList}>
        {loading ? (
          <p style={styles.message}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={styles.message}>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <p><strong>Service:</strong> {order.service_name}</p>
              <p><strong>Club:</strong> {order.club_name}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Location:</strong> {order.location}</p>
              <p><strong>Additional Info:</strong> {order.additional_info}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  arrowContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    cursor: 'pointer',
  },
  arrowIcon: {
    width: '24px',
    height: '24px',
    color: '#000',
  },
  title: {
    fontSize: '2em',
    color: '#510C76',
    fontWeight: 'bold',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    width: '100%',
  },
  orderCard: {
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.4)',
    transform: 'transform 0.2s ease, scale(1.05)',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  message: {
    color: '#800080',
    fontSize: '1.2em',
  },
};

export default OrderHistory;
