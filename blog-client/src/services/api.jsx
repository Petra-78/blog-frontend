export async function getPosts() {
  const res = await fetch(
    "https://blog-api-production-323f.up.railway.app/posts"
  );
  const data = await res.json;
  return data.posts;
}
