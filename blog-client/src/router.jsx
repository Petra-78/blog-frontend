import Home from "./pages/home/Home";
import App from "./App";
import Error from "./components/Error/Error";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import AdminLogin from "./pages/login/AdminLogin";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "posts/:id", element: <Post /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/admin", element: <AdminLogin /> },
    ],
  },
];

export default routes;
