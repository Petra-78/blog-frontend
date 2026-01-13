import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <h1>From Scratch </h1>
      </div>

      <div className={styles.right}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/signup" className={styles.link}>
              Sign up
            </Link>
          </>
        ) : (
          <>
            <h2 className={styles.welcome}>Welcome, {user.username}</h2>
            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
