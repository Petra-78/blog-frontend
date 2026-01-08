import { useContext, useState } from "react";

export default function Login() {
  return (
    <div>
      <div>
        <h1>Login</h1>
        <form
          action="POST"
          method="https://blog-api-production-323f.up.railway.app/login"
        >
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
