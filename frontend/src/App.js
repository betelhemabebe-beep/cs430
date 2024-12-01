import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentLogin from './components/StudentLogin';
import ClubLogin from './components/ClubLogin';
import AdminLogin from './components/AdminLogin';
import RegisterStudent from './components/RegisterStudent';
import RegisterClub from './components/RegisterClub';
import StudentDashboard from './components/StudentDashboard';
import ClubDashboard from './components/ClubDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddService from './components/AddService';
import ClubOrders from './components/ClubOrders';
import ClubProfile from './components/ClubProfile';
import OrderHistory from './components/OrderHistory';
import ServiceList from './components/ServiceList';
import ServicePage from './components/ServicePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/club" element={<RegisterClub />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/club" element={<ClubLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
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
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
