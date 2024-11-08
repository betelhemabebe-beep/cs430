// src/components/AdminDashboard.js
import React from 'react';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <a href="/admin/approve-clubs">Approve Clubs</a>
      <a href="/admin/manage-users">Manage Users</a>
    </div>
  );
}

export default AdminDashboard;
