import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userType, children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  // Simulate extracting the user type from the token (this depends on how your token is structured)
  // Assuming your token is a JWT, you might decode it to get user type.
  let storedUserType = null;

  if (token) {
    // Decode the token to retrieve user type
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    storedUserType = payload.userType; // Adjust this to match your actual payload structure
  }

  // Redirect paths based on user type
  let redirectTo = "/";
  if (userType === "admin") {
    redirectTo = "/login";
  } else if (userType === "dispatcher") {
    redirectTo = "/dispatcher-login";
  } else if (userType === "collector") {
    redirectTo = "/collector-login";
  }

  // If the token does not exist or the user type does not match, redirect to the appropriate login page
  if (!token || storedUserType !== userType) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
