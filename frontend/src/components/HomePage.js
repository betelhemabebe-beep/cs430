import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.homepage}>
      <h1 style={styles.header}>Truman Club Delivery</h1>
      <div style={styles.roleSelectionCentered}>
        <Link to="/register/student" style={styles.link}>
          <div style={styles.cardLarge}>
            <h2>Student</h2>
          </div>
        </Link>
        <Link to="/register/club" style={styles.link}>
          <div style={styles.cardLarge}>
            <h2>Club</h2>
          </div>
        </Link>
      </div>
      <Link to="/admin/login" style={styles.adminLink}>
        <h3>Admin</h3>
      </Link>
    </div>
  );
}

const styles = {
  homepage: {
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to top,#510C76, #ffffff)',
    color: '#fff',
    fontFamily: 'Quincy CF, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '4.5em',
    fontWeight: 'bold',
    marginTop: '0px',
    marginBottom: '60px',
    color: '#800080',
  },
  roleSelectionCentered: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardLarge: {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '10px',
    width: '300px',
    borderRadius: '30px',
    textAlign: 'center',
    backgroundColor: '#000',
    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  adminLink: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontSize: '1em',
    color: '#000000',
    textDecoration: 'none',
  },
};

export default HomePage;
