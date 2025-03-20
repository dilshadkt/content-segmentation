import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, requireProfileComplete = true }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children; // Render the children if all conditions are met
};
