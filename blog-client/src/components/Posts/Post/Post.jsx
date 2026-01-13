import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { getPost } from "../../../services/api";
import { Loading } from "../../Loading/Loading";
import Comments from "../../Comments/Comments";
import { CommentForm } from "../../Comments/CommentsForm/CommentForm";
import { useAuth } from "../../../context/authContext";
import styles from "./Post.module.css";

export default function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  console.log(post);

  const params = useParams();
  const id = params.id;

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getPost(id);
        setPost(postData);
        setComments(postData.comments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

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
      {!post && <p className={styles.notFound}>Post not found.</p>}

      {post && (
        <div key={post.id} className={styles.post}>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.author}>
            <h3>Petra P.</h3>
            <p>{formatDate(post.postedAt)}</p>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <h2 className={styles.commentsHeading}>Comments</h2>

          {isAuthenticated ? (
            <CommentForm
              postId={post.id}
              onCommentCreated={(newComment) => {
                setComments((prev) => [...prev, newComment]);
              }}
            />
          ) : (
            <Link to={"/login"} className={styles.loginLink}>
              <button className={styles.loginButton}>
                Log in to leave a comment
              </button>
            </Link>
          )}

          <Comments comments={comments} setComments={setComments} />
        </div>
      )}

      {loading && <Loading />}
    </div>
  );
}
