import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";
import { getPost } from "../../services/api";
import { Loading } from "../Loading/Loading";
import Comments from "../Comments/Comments";
import { CommentForm } from "../Comments/CommentForm";
import { useAuth } from "../../context/authContext";

export default function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {!post && <p>Post not found.</p>}
      {post && (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {isAuthenticated ? (
            <CommentForm postId={post.id} />
          ) : (
            <Link to={"/login"}>
              <button>Log in to leave a comment</button>
            </Link>
          )}
          <Comments />
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}
