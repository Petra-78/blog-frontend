import Home from "./pages/home/Home";
import App from "./App";
import Error from "./components/Error/Error";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post/Post";

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
    ],
  },
];

export default routes;
