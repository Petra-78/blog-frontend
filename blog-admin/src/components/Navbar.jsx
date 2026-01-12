import { Link } from "react-router";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      {user && (
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="nav-link">
              Posts
            </Link>

            <Link to="/comments" className="nav-link">
              Comments
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/new-post">
              <button className="new-post-btn">+ New Post</button>
            </Link>

            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
