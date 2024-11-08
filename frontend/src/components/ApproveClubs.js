// src/components/ApproveClubs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApproveClubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await axios.get('/admin/clubs/pending', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setClubs(res.data);
    };
    fetchClubs();
  }, []);

  const approveClub = async (clubId) => {
    await axios.put(`/admin/clubs/${clubId}/approve`, {}, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    // Refresh clubs list
  };

  return (
    <div>
      <h2>Pending Club Approvals</h2>
      <ul>
        {clubs.map((club) => (
          <li key={club.id}>
            {club.name} - <button onClick={() => approveClub(club.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApproveClubs;
