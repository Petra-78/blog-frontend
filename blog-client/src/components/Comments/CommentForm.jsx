import { useParams } from "react-router";

export function CommentForm(id) {
  debugger;
  return (
    <form
      action="POST"
      method={`https://blog-api-production-323f.up.railway.app/posts/${id}/comments`}
    >
      <label htmlFor="content">Message:</label>
      <textarea name="content" id="content"></textarea>
    </form>
  );
}
