// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.homepage}>
      <h1 style={styles.header}>Truman Club Delivery</h1>
      <div style={styles.roleSelection}>
        <Link to="/register/student" style={styles.link}>
          <div style={styles.card}>
            <h2>Student</h2>
            <p>Sign up or log in as a student to browse and order services.</p>
          </div>
        </Link>
        <Link to="/register/club" style={styles.link}>
          <div style={styles.card}>
            <h2>Club</h2>
            <p>Register your club to offer services or log in if you already have an account.</p>
          </div>
        </Link>
        <Link to="/admin/login" style={styles.link}>
          <div style={styles.card}>
            <h2>Admin</h2>
            <p>Admin access for managing clubs and students.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  homepage: {
    textAlign: 'center',
  },
  header: {
    fontSize: '2em',
    margin: '20px 0',
  },
  roleSelection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    width: '200px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
};

export default HomePage;
