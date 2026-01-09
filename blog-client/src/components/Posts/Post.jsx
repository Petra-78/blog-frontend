import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPost } from "../../services/api";
import { Loading } from "../Loading/Loading";

export default function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;

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
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
}
