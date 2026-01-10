import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import { useAuth } from "../context/authContext";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Status: {post.published ? "Published" : "Draft"}</p>
          <button>Edit</button>
          <button>{post.published ? "Unpublish" : "Publish"}</button>
        </div>
      ))}
    </div>
  );
}
