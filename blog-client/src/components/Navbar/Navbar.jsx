import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            {" "}
            <h2>Welcome, {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
