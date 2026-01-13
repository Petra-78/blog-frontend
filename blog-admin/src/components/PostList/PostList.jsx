import { useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router";
import { togglePostPublished, deletePost } from "../../services/api";
import styles from "./PostList.module.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    debugger;
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleToggle = async (post) => {
    try {
      await togglePostPublished(post.id, !post.published, token);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This cannot be undone."
    );

    if (!confirmed) return;
    try {
      await deletePost(postId, token);

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  function formatDate(isoString) {
    if (!isoString) return "";

    const date = new Date(isoString);

    if (isNaN(date)) return "";

    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  return (
    <div className={styles.wrapper}>
      <h1>Posts</h1>
      {loading && <p className={styles.info}>Loading...</p>}
      {!loading && posts.length === 0 && (
        <p className={styles.info}>No posts yet. Create one!</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.author}>
            <h3>Petra P.</h3>
            <p>{formatDate(post.postedAt)}</p>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <p className={styles.status}>
            Status:{" "}
            <button
              className={`${styles.statusButton} ${
                post.published ? styles.published : styles.draft
              }`}
              onClick={() => handleToggle(post)}
            >
              {post.published ? "Published" : "Draft"}
            </button>
          </p>

          <div className={styles.actions}>
            <Link to={`/edit/${post.id}`}>
              <button className={styles.editButton}>Edit</button>
            </Link>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
