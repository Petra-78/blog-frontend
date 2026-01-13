import { useState, useEffect } from "react";
import { getPosts } from "../../services/api";
import { Link } from "react-router";
import { Loading } from "../Loading/Loading";
import truncate from "truncate-html";
import styles from "./Posts.module.css";

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
    <div className={styles.wrapper}>
      {!posts && <p className={styles.empty}>No posts yet.</p>}
      {loading && <Loading />}
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} className={styles.link}>
            <div className={styles.postCard}>
              <h2 className={styles.title}>{post.title}</h2>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: truncate(post.content, 100, { ellipsis: "..." }),
                }}
              />
            </div>
          </Link>
        ))}
    </div>
  );
}
