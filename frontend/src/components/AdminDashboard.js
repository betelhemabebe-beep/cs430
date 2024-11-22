// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resClubs = await axios.get('/admin/clubs/pending', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        const resUsers = await axios.get('/admin/users', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setPendingClubs(resClubs.data);
        setUsers(resUsers.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const approveClub = async (clubId) => {
    try {
      await axios.put(`/admin/clubs/${clubId}/approve`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setPendingClubs(pendingClubs.filter(club => club.id !== clubId));
      const resUsers = await axios.get('/admin/users', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUsers(resUsers.data);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <svg
          onClick={() => navigate('/')}
          style={styles.backIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M14.7 6.7c.4-.4.4-1 0-1.4s-1-.4-1.4 0L8.6 10l4.7 4.7c.4.4.4 1 0 1.4s-1 .4-1.4 0L7 10.7c-.4-.4-.4-1 0-1.4L13.3 6.7c.4-.4 1-.4 1.4 0z"/>
        </svg>
        <h2 style={styles.title}>Admin Dashboard</h2>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Pending Clubs</h3>
        <ul style={styles.list}>
          {pendingClubs.map((club) => (
            <li key={club.id} style={styles.card}>
              <div style={styles.clubDetails}>
                <p style={styles.itemName}><strong>{club.name}</strong></p>
                <p style={styles.itemDetail}><strong>Description:</strong> {club.description}</p>
                <p style={styles.itemDetail}><strong>Contact Email:</strong> {club.contact_email}</p>
              </div>
              <button style={styles.approveButton} onClick={() => approveClub(club.id)}>
                Approve
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Manage Users</h3>
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.card}>
              <div style={styles.userDetails}>
                <span style={styles.itemName}>
                  {user.role === 'club' ? user.club_name : user.username} <span style={styles.userRole}>({user.role})</span>
                </span>
                {user.role === 'club' && (
                  <>
                    <p style={styles.itemDetail}><strong>Description:</strong> {user.description}</p>
                    <p style={styles.itemDetail}><strong>Contact Email:</strong> {user.contact_email}</p>
                  </>
                )}
              </div>
              <button style={styles.deleteButton} onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    cursor: 'pointer',
    color: '#4CAF50',
  },
  title: {
    fontSize: '28px',
    textAlign: 'center',
    flex: 1,
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#333',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '5px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  clubDetails: {
    textAlign: 'left',
    maxWidth: '70%',
  },
  userDetails: {
    textAlign: 'left',
    maxWidth: '70%',
  },
  itemName: {
    fontSize: '18px',
    color: '#333',
  },
  itemDetail: {
    fontSize: '14px',
    color: '#555',
    marginTop: '4px',
  },
  userRole: {
    fontSize: '14px',
    color: '#777',
    marginLeft: '5px',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default AdminDashboard;
