import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [verifiedClubs, setVerifiedClubs] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const resClubs = await axios.get('/admin/clubs/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resVerifiedClubs = await axios.get('/admin/clubs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resUsers = await axios.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPendingClubs(resClubs.data);
      setVerifiedClubs(resVerifiedClubs.data);
      setStudents(resUsers.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const approveClub = async (clubId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/admin/clubs/${clubId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  const deleteClub = async (clubId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/admin/clubs/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Admin Dashboard</h2>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Pending Clubs</h3>
        {pendingClubs.length === 0 ? (
          <p>No pending clubs available</p>
        ) : (
          <ul style={styles.list}>
            {pendingClubs.map((club) => (
              <li key={club.id} style={styles.card}>
                <div style={styles.clubDetails}>
                  <p style={styles.itemName}><strong>{club.name}</strong></p>
                  <p style={styles.itemDetail}><strong>Description:</strong> {club.description}</p>
                  <p style={styles.itemDetail}><strong>Contact Email:</strong> {club.contact_email}</p>
                </div>
                <div>
                  <button style={styles.approveButton} onClick={() => approveClub(club.id)}>Approve</button>
                  <button style={styles.deleteButton} onClick={() => deleteClub(club.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Verified Clubs</h3>
        {verifiedClubs.length === 0 ? (
          <p>No verified clubs available</p>
        ) : (
          <ul style={styles.list}>
            {verifiedClubs.map((club) => (
              <li key={club.id} style={styles.card}>
                <div style={styles.clubDetails}>
                  <p style={styles.itemName}><strong>{club.name}</strong></p>
                  <p style={styles.itemDetail}><strong>Description:</strong> {club.description}</p>
                  <p style={styles.itemDetail}><strong>Contact Email:</strong> {club.contact_email}</p>
                </div>
                <div>
                  <button style={styles.deleteButton} onClick={() => deleteClub(club.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Manage Users</h3>
        {students.length === 0 ? (
          <p>No users available</p>
        ) : (
          <ul style={styles.list}>
            {students.map((user) => (
              <li key={user.id} style={styles.card}>
                <div style={styles.userDetails}>
                  <span style={styles.itemName}>{user.username} <span style={styles.userRole}>(Student)</span></span>
                  <p style={styles.itemDetail}><strong>Email:</strong> {user.email}</p>
                </div>
                <button style={styles.deleteButton} onClick={() => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '100%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg,#510C76, #ffffff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '36px',
    textAlign: 'center',
    color: '#fff',
  },
  section: {
    marginBottom: '30px',
    textAlign: 'left',
    width: '100%',
    maxWidth: '900px',
  },
  sectionTitle: {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#fff',
    borderBottom: '2px solid #000',
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
    padding: '20px',
    margin: '15px 0',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    backgroundColor: '#cbaacb',
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
    color: '#f0f0f0',
  },
  itemDetail: {
    fontSize: '14px',
    color: '#dcdcdc',
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
  logoutButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#800080',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default AdminDashboard;
