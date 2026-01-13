import { Link } from "react-router";
import { useAuth } from "../../context/authContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      {user && (
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <Link to="/" className={styles.link}>
              Posts
            </Link>
            <Link to="/comments" className={styles.link}>
              Comments
            </Link>
          </div>

          <div className={styles.right}>
            <Link to="/new-post">
              <button className={styles.newPost}>+ New Post</button>
            </Link>

            <button onClick={logout} className={styles.logout}>
              Logout
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
