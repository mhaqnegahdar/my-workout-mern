import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const ProtectedAuthRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
