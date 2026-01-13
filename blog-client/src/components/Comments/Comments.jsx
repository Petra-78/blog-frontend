import { useEffect, useState } from "react";
import { getComments } from "../../services/api";
import { useParams } from "react-router";
import { Loading } from "../Loading/Loading";
import { useAuth } from "../../context/authContext";
import { DeleteComment } from "./DeleteComments/DeleteComment";

import styles from "./Comments.module.css";

export default function Comments({ comments, setComments }) {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.id;
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function formatDate(isoString) {
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(isoString));
  }

  return (
    <div className={styles.wrapper}>
      {!comments && (
        <p className={styles.empty}>Be the first to write a comment.</p>
      )}

      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.header}>
              <h2 className={styles.username}>{comment.user.username}</h2>
              <span className={styles.date}>
                {formatDate(comment.postedAt)}
              </span>
            </div>

            <p className={styles.content}>{comment.content}</p>

            {userId === comment.userId && (
              <div className={styles.actions}>
                <DeleteComment
                  commentId={comment.id}
                  onDeleted={(id) => {
                    setComments((prev) =>
                      prev.filter((comment) => comment.id !== id)
                    );
                  }}
                />
              </div>
            )}
          </div>
        ))}

      {loading && <Loading />}
    </div>
  );
}
