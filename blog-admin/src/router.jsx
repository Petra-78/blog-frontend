import PostList from "./components/PostList";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [{ index: true, element: <PostList /> }],
  },
];

export default routes;
