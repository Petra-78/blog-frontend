import { useState, useEffect } from "react";
import { getPosts } from "../../services/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postsData = await getPosts();
      setPosts(postsData);
    }

    fetchData();
  }, []);
  return (
    <div>
      if(!posts){<h1>No posts yet</h1>}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
