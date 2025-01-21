import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};
