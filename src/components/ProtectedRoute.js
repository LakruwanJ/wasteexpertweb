import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userType, children }) => {
  const token = localStorage.getItem('token');
  
  // Define paths based on user types
  let redirectTo;
  if (userType === 'admin') {
    redirectTo = '/admin-login';
  } else if (userType === 'dispatcher') {
    redirectTo = '/dispatcher-login';
  } else if (userType === 'collector') {
    redirectTo = '/collector-login';
  } else {
    redirectTo = '/'; // Default redirect path if userType is not recognized
  }

  return token ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
