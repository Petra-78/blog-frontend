import { useEffect, useState } from "react";
import { getComments } from "../../services/api";
import { useParams } from "react-router";
import { Loading } from "../Loading/Loading";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);

  return (
    <div>
      {!comments && <p>Be the first to write a commment.</p>}
      {comments &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.user.username}</h2>
            <p>{comment.content}</p>
          </div>
        ))}
      {loading && <Loading />}
    </div>
  );
}
