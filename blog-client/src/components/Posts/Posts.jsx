import { useState, useEffect } from "react";
import { getPosts } from "../../services/api";
import { Link } from "react-router";
import { Loading } from "../Loading/Loading";
import truncate from "truncate-html";
import styles from "./Posts.module.css";
import placeholderImg from "../../assets/placeholder.jpg";

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

  function formatDate(isoString) {
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(isoString));
  }

  return (
    <>
      {!posts && <p className={styles.empty}>No posts yet.</p>}
      {loading && <Loading />}
      <div className={styles.wrapper}>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <div className={styles.postCard}>
              <img src={placeholderImg} alt="placeholder image" />
              <div className={styles.author}>
                <h3>Petra P.</h3>
                <p>{formatDate(post.postedAt)}</p>
              </div>

              <h2 className={styles.title}>{post.title}</h2>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: truncate(post.content, 100, { ellipsis: "..." }),
                }}
              />
              <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className={styles.link}
              >
                Read more
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
