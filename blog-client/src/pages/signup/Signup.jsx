export default function Login() {
  return (
    <div>
      <div>
        <form
          action="POST"
          method="https://blog-api-production-323f.up.railway.app/login"
        >
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />

          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />

          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
