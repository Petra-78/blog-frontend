import { useState } from "react";
import TextEditor from "../Editor";
import { createPost } from "../../services/api";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router";
import styles from "./NewPost.module.css";

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
    <div className={styles.wrapper}>
      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <h3 className={styles.heading}>New Post</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />

        <TextEditor
          value={""}
          onChange={(newContent) => setContent(newContent)}
        />

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className={styles.checkbox}
          />
          Publish
        </label>

        <button type="submit" className={styles.submitButton}>
          Post
        </button>
      </form>
    </div>
  );
}
