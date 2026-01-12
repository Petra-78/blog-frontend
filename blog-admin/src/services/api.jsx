export async function getPosts() {
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

export async function createPost(title, content, published, token) {
  debugger;
  const res = await fetch(
    `https://blog-api-production-323f.up.railway.app/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, published }),
    }
  );
}

export async function togglePostPublished(id, published, token) {
  const res = await fetch(
    `https://blog-api-production-323f.up.railway.app/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ published }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}

export async function deletePost(id, token) {
  debugger;
  const res = await fetch(
    `https://blog-api-production-323f.up.railway.app/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete post");
  }

  return data;
}
