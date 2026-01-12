import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../services/api";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";

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
    <div>
      {loading && <p>Loading...</p>}
      {!loading && comments.length === 0 && <p>No comments yet. </p>}
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h3>{comment.user.username}</h3>

            <p>{comment.content}</p>
            <Link to={`/edit/${comment.postId}`}>
              <p>Post id: {comment.postId}</p>
            </Link>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
