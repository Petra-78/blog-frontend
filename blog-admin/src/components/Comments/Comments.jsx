import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../../services/api";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router";
import styles from "./Comments.module.css";

export default function Comments() {
  debugger;
  const [comments, setComments] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugger;

    async function fetchComments() {
      try {
        const data = await getComments(token);
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment? This cannot be undone."
    );

    if (!confirmed) return;
    try {
      await deleteComment(id, token);

      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Comments</h1>
      {loading && <p className={styles.info}>Loading...</p>}
      {!loading && comments.length === 0 && (
        <p className={styles.info}>No comments yet.</p>
      )}

      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className={styles.commentCard}>
            <h3 className={styles.username}>
              {comment.user.username}, {formatDate(comment.postedAt)}
            </h3>

            <p className={styles.content}>{comment.content}</p>

            <Link to={`/edit/${comment.postId}`} className={styles.postLink}>
              Post id: {comment.postId}
            </Link>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}
