import { useEffect, useState } from "react";
import { getComments } from "../../services/api";
import { useParams } from "react-router";
import { Loading } from "../Loading/Loading";
import { useAuth } from "../../context/authContext";
import { DeleteComment } from "./DeleteComment";

export default function Comments() {
  debugger;
  const [comments, setComments] = useState([]);
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

        console.log(comments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      {!comments && <p>Be the first to write a commment.</p>}
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.user.username}</h2>
            <p>{comment.content}</p>
            {userId === comment.userId && (
              <DeleteComment
                commentId={comment.id}
                onDeleted={(id) => {
                  setComments((prev) =>
                    prev.filter((comment) => comment.id !== id)
                  );
                }}
              />
            )}
          </div>
        ))}
      {loading && <Loading />}
    </div>
  );
}
