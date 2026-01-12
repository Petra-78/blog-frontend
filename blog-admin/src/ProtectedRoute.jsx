import { useAuth } from "./context/authContext";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  debugger;
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
