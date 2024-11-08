// src/components/ManageUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/admin/users', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`/admin/users/${userId}`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    // Refresh users list
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.role}) - <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
