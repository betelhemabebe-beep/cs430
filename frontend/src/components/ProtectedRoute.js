// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Change this line

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');

  const isAuthorized = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token); // Use jwtDecode here instead of jwt_decode
      return decoded.role === role;
    } catch (err) {
      return false;
    }
  };

  return isAuthorized() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
