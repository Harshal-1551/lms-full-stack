import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role || user?.privateMetadata?.role || "user";

  if (role !== "admin" && role !== "educator") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
