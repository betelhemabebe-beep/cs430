// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentDashboard() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await axios.get('/student/clubs', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setClubs(res.data);
    };
    fetchClubs();
  }, []);

  return (
    <div>
      <h2>Available Clubs</h2>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            <a href={`/student/clubs/${club.id}`}>{club.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDashboard;
