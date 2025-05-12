import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../../Server/utils/useAuth";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // Only allow the admin user
  if (user && user.email === "izuchukwuonuoha6@gmail.com") {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;