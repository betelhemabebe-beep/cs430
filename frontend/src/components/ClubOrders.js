import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClubOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in.');
        const res = await axios.get('/club/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in.');
      await axios.put(
        `/club/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to update order status');
    }
  };

  const ordersByStatus = (status) =>
    orders.filter((order) => order.status === status);

  if (loading) return <div style={styles.message}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <svg
          onClick={() => navigate('/club/dashboard')}
          style={styles.backIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <h2 style={styles.header}>Orders</h2>
      </div>

      {['requested', 'confirmed', 'completed'].map((status) => (
        <div key={status}>
          <h3 style={styles.subHeader}>{status.charAt(0).toUpperCase() + status.slice(1)} Orders</h3>
          <ul style={styles.orderList}>
            {ordersByStatus(status).length === 0 ? (
              <p style={styles.message}>No {status} orders.</p>
            ) : (
              ordersByStatus(status).map((order) => (
                <li key={order.id} style={styles.orderItem}>
                  <p style={styles.orderDetails}>
                    <strong>{order.service_name}</strong> by {order.student_username}
                  </p>
                  <p style={styles.orderDetails}>
                    <strong>Location:</strong> {order.location}
                  </p>
                  <p style={styles.orderDetails}>
                    <strong>Additional Info:</strong> {order.additional_info || 'None'}
                  </p>
                  {status === 'requested' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      style={styles.button}
                    >
                      Confirm
                    </button>
                  )}
                  {status === 'confirmed' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      style={styles.button}
                    >
                      Mark as Completed
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
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
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: '20px',
  },
  backIcon: {
    position: 'absolute',
    left: '20px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: '#fff',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#800080',
    textAlign: 'center',
    flex: 1,
  },
  subHeader: {
    fontSize: '1.8em',
    color: '#800080',
    margin: '20px 0 10px',
  },
  orderList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  orderItem: {
    backgroundColor: '#cbaacb',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
  },
  orderDetails: {
    margin: 0,
    color: '#800080',
    fontSize: '1.1em',
  },
  button: {
    marginTop: '10px',
    padding: '8px 15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#800080',
    color: '#fff',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    color: '#800080',
    fontSize: '1.2em',
  },
};

export default ClubOrders;
