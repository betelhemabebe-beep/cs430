import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const clubsWithServices = res.data.filter((club) => club.hasServices);
        setClubs(clubsWithServices);
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
      <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for clubs..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchBar}
      />
      </div>
      <div style={styles.clubList}>
        {filteredClubs.length === 0 ? (
          <p>No clubs found</p>
        ) : (
          filteredClubs.map((club) => (
            <div
              key={club.id}
              style={styles.clubCard}
              onClick={() => navigate(`/student/clubs/${club.id}/services`)}
            >
              <img src={club.image_url || '/placeholder.jpg'} alt={club.name} style={styles.clubImage} />
              <h3 style={styles.clubName}>{club.name}</h3>
            </div>
          ))
        )}
      </div>
      <button style={styles.logoutButton} onClick={() => navigate('/')}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Argent CF, sans-serif',
    background: 'linear-gradient(to top,#510C76, #ffffff)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '20px',
  },
  welcome: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#510C76',
    marginBottom: '10px',
    textAlign: 'center',
  },
  orderButton: {
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: '10px',
    fontSize: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',

  },
  searchContainer: {
    width: '100%',
    maxWidth: '800px',
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '1px solid #000',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    outline: 'none',
  },
  clubList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1800px',
    marginTop: '20px',
  },
  clubCard: {
    width: '150px',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: '10px',
    transform: 'transform 0.2s ease, scale(1.05)',
  },
  clubImage: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
  },
  clubName: {
    fontSize: '18px',
    margin: '10px 0',
  },
 logoutButton: {
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    cursor: 'pointer',
    marginTop: '20px',
    marginBottom: '20px',
    alignSelf: 'flex-end',
  },
};

export default StudentDashboard;
