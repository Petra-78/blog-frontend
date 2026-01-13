import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useParams, useNavigate } from "react-router";
import { getPost } from "../../services/api";
import TextEditor from "../Editor";
import styles from "./EditForm.module.css";

export default function EditForm() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      debugger;
      const res = await fetch(
        `https://blog-api-production-323f.up.railway.app/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: post.title,
            content: post.content,
            published: post.published,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save post");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapper}>
      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {post && (
        <>
          <h3 className={styles.heading}>Edit Post</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              className={styles.input}
            />

            <TextEditor
              value={post.content}
              onChange={(newContent) =>
                setPost((prev) => ({ ...prev, content: newContent }))
              }
            />

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="published"
                checked={post.published}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, published: e.target.checked }))
                }
                className={styles.checkbox}
              />
              Published
            </label>

            <div className={styles.actions}>
              <button type="submit" disabled={loading} className={styles.save}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
