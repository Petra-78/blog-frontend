import { useState } from "react";
import { useAuth } from "../../context/authContext";

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
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="content">Message:</label>

      <textarea
        id="content"
        value={content}
        onChange={(e) => {
          if (e.target.value.length <= MAX_COMMENT_LENGTH) {
            setContent(e.target.value);
          }
        }}
        required
      />
      <p>
        {content.length}/{MAX_COMMENT_LENGTH}
      </p>
      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
