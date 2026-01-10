import { useAuth } from "../../context/authContext";

export function DeleteComment({ commentId, onDeleted }) {
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://blog-api-production-323f.up.railway.app/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }

      if (onDeleted) {
        onDeleted(commentId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
