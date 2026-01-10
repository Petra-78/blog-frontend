import "./App.css";
import { Outlet } from "react-router";
import { useAuth } from "./context/authContext";

function App() {
  const { user, isAuthenticated } = useAuth();

  if (!user && isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (!user?.isAdmin) {
    return <p>Admin only. You do not have permission to view this page.</p>;
  }
  return <Outlet />;
}

export default App;
