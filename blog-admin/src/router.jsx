import PostList from "./components/PostList";
import EditForm from "./components/PostForm";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      { index: true, element: <PostList /> },
      {
        path: "/edit/:id",
        element: <EditForm />,
      },
    ],
  },
];

export default routes;
