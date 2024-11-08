// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RegisterStudent from './components/RegisterStudent';
import RegisterClub from './components/RegisterClub';
import StudentDashboard from './components/StudentDashboard';
import ClubDashboard from './components/ClubDashboard';
import AdminDashboard from './components/AdminDashboard';
import ApproveClubs from './components/ApproveClubs';
import ManageUsers from './components/ManageUsers';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact component={Login} />
        <Route path="/register/student" component={RegisterStudent} />
        <Route path="/register/club" component={RegisterClub} />
        <Route path="/login" component={Login} />

        {/* Student Routes */}
        <ProtectedRoute path="/student/dashboard" component={StudentDashboard} role="student" />
        {/* ...other student routes */}

        {/* Club Routes */}
        <ProtectedRoute path="/club/dashboard" component={ClubDashboard} role="club" />
        {/* ...other club routes */}

        {/* Admin Routes */}
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} role="admin" />
        <ProtectedRoute path="/admin/approve-clubs" component={ApproveClubs} role="admin" />
        <ProtectedRoute path="/admin/manage-users" component={ManageUsers} role="admin" />
      </Routes>
    </div>
  );
}

export default App;
