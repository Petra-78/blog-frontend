import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import styles from "./CommentsForm.module.css";

export function CommentForm({ postId, onCommentCreated }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const MAX_COMMENT_LENGTH = 500;

  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://blog-api-production-323f.up.railway.app/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) {
        throw new Error(data.message || "Failed to post comment");
      }

      const data = await res.json();

      setContent("");
      onCommentCreated(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <label className={styles.label} htmlFor="content">
        Leave a comment
      </label>

      <textarea
        id="content"
        className={styles.textarea}
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= MAX_COMMENT_LENGTH) {
            setContent(e.target.value);
          }
        }}
        required
      />

      <p className={styles.counter}>
        {content.length}/{MAX_COMMENT_LENGTH}
      </p>

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
