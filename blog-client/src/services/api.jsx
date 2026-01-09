export async function getPosts() {
  debugger;
  const res = await fetch(
    "https://blog-api-production-323f.up.railway.app/posts"
  );
  const data = await res.json();
  return data.posts;
}

export async function getPost(id) {
  debugger;
  const res = await fetch(
    `https://blog-api-production-323f.up.railway.app/posts/${id}`
  );
  const data = await res.json();
  return data.post;
}
