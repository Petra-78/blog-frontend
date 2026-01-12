import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import { useAuth } from "../context/authContext";
import { Link } from "react-router";
import { togglePostPublished, deletePost } from "../services/api";

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

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This cannot be undone."
    );

    if (!confirmed) return;
    try {
      await deletePost(postId, token);

      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {posts.length === 0 && <p>No posts yet. Create one!</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p>
            Status:
            <button onClick={() => handleToggle(post)}>
              {post.published ? "Published" : "Draft"}
            </button>
          </p>
          <Link to={`/edit/${post.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
