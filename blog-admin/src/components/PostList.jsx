import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";
import { togglePostPublished } from "../services/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    debugger;
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleToggle = async (post) => {
    try {
      await togglePostPublished(post.id, !post.published, token);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            Status:{" "}
            <button onClick={() => handleToggle(post)}>
              {post.published ? "Published" : "Draft"}
            </button>
          </p>
          <Link to={`/edit/${post.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
