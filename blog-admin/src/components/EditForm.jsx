import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router";
import { getPost } from "../services/api";

export default function EditForm() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    console.log({ token, user });

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
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to save post");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!post && <p>Post not found</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {post && (
        <>
          <h3>Edit post</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              required
            />

            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              rows={8}
              required
            />

            <label>
              <input
                type="checkbox"
                name="published"
                checked={post.published}
                onChange={(e) =>
                  setPost((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
              />
              Published
            </label>

            <div>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button">Cancel</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
