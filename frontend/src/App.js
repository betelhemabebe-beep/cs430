// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import RegisterStudent from './components/RegisterStudent';
import RegisterClub from './components/RegisterClub';
import StudentDashboard from './components/StudentDashboard';
import ClubDashboard from './components/ClubDashboard';
import AdminDashboard from './components/AdminDashboard';
import ApproveClubs from './components/ApproveClubs';
import ManageUsers from './components/ManageUsers';
import ProtectedRoute from './components/ProtectedRoute';
import AddService from './components/AddService';
import ClubOrders from './components/ClubOrders';
import ClubProfile from './components/ClubProfile';
import OrderHistory from './components/OrderHistory'; // New Order History component
import ServiceList from './components/ServiceList'; // New Service List component
import ServicePage from './components/ServicePage'; // Component for individual service orders

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/club" element={<RegisterClub />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login role="admin" />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}
        />
        <Route
          path="/student/orders"
          element={<ProtectedRoute role="student"><OrderHistory /></ProtectedRoute>}
        />
        <Route
          path="/student/clubs/:clubId/services"
          element={<ProtectedRoute role="student"><ServiceList /></ProtectedRoute>}
        />
        <Route
          path="/student/services/:serviceId"
          element={<ProtectedRoute role="student"><ServicePage /></ProtectedRoute>}
        />

        {/* Club Routes */}
        <Route
          path="/club/dashboard"
          element={<ProtectedRoute role="club"><ClubDashboard /></ProtectedRoute>}
        />
        <Route
          path="/club/add-service"
          element={<ProtectedRoute role="club"><AddService /></ProtectedRoute>}
        />
        <Route
          path="/club/orders"
          element={<ProtectedRoute role="club"><ClubOrders /></ProtectedRoute>}
        />
        <Route
          path="/club/profile"
          element={<ProtectedRoute role="club"><ClubProfile /></ProtectedRoute>}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/approve-clubs"
          element={<ProtectedRoute role="admin"><ApproveClubs /></ProtectedRoute>}
        />
        <Route
          path="/admin/manage-users"
          element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
