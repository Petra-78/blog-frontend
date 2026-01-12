import { useState } from "react";
import TextEditor from "./Editor";
import { createPost } from "../services/api";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export default function NewPost() {
  debugger;
  const { token, user } = useAuth();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log({ token, user });

    try {
      debugger;
      const res = await createPost(title, content, published, token);
      console.log(res);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <>
        <h3>New post</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor
            value={""}
            onChange={(newContent) => setContent(newContent)}
          />
          <label>
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Publish
          </label>
          <button type="submit">Post</button>
        </form>
      </>
    </div>
  );
}
