import { useState, useEffect } from "react";
import { getPosts } from "../../services/api";
import { Link } from "react-router";
import { Loading } from "../Loading/Loading";
import Comments from "../Comments/Comments";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsData = await getPosts();
        setPosts(postsData);

        console.log(posts);
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
      {!posts && <p>No posts yet.</p>}
      {loading && <Loading />}
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Link to={`/posts/${post.id}`}>
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
