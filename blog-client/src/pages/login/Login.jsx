import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(
        "https://blog-api-production-323f.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      login(data.token, data.user);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// export default function Login() {
//   return (
//     <div>
//       <div>
//         <h1>Admin login</h1>
//         <form
//           action="POST"
//           method="https://blog-api-production-323f.up.railway.app/login"
//         >
//           <label htmlFor="email">Email</label>
//           <input type="text" name="email" id="email" />

//           <label htmlFor="password">Password</label>
//           <input type="text" name="password" id="password" />

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }
