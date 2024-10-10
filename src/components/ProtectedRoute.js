import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userType, children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  let storedUserType = null;

  if (token) {
    try {
      // Decode the token to retrieve user type
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      storedUserType = payload.userType; // Ensure this matches your actual payload structure
    } catch (error) {
      console.error("Invalid token format:", error);
      return <Navigate to="/login" />;
    }
  }

  // Redirect paths based on user type if they try to access unauthorized pages
  if (!token || storedUserType !== userType) {
    // Redirect to the appropriate login page if the token is missing or the user type is incorrect
    switch (userType) {
      case "admin":
        return <Navigate to="/login" />;
      case "dispatcher":
        return <Navigate to="/dispatcher-login" />;
      case "collector":
        return <Navigate to="/collector-login" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // If token exists and userType matches, render children (the protected dashboard)
  return children;
};

export default ProtectedRoute;
