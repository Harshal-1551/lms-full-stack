import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userRole, isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
