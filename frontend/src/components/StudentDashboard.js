// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract username from the token manually
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        setUsername(payload.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    const fetchClubs = async () => {
      try {
        const res = await axios.get('/student/clubs', {
          headers: { Authorization: token },
        });
        setClubs(res.data);
      } catch (error) {
        alert('Error fetching clubs');
      }
    };

    fetchClubs();
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.welcome}>Welcome, {username}!</h2>
        <button style={styles.orderButton} onClick={() => navigate('/student/orders')}>
          Your Orders
        </button>
      </div>
      <input
        type="text"
        placeholder="Search for clubs..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchBar}
      />
      <div style={styles.clubList}>
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            style={styles.clubCard}
            onClick={() => navigate(`/student/clubs/${club.id}/services`)}
          >
            <img src={club.image_url || '/placeholder.jpg'} alt={club.name} style={styles.clubImage} />
            <h3 style={styles.clubName}>{club.name}</h3>
          </div>
        ))}
      </div>
      <button style={styles.logoutButton} onClick={() => navigate('/')}>Logout</button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  welcome: { fontSize: '24px', color: '#333' },
  searchBar: { width: '100%', padding: '10px', margin: '10px 0', fontSize: '16px' },
  orderButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' },
  clubList: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' },
  clubCard: { width: '150px', padding: '10px', textAlign: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.1)', cursor: 'pointer' },
  clubImage: { width: '100%', height: '100px', objectFit: 'cover' },
  clubName: { fontSize: '18px', margin: '10px 0' },
  logoutButton: { padding: '10px', backgroundColor: '#ff5f5f', color: '#fff', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '20px' },
};

export default StudentDashboard;