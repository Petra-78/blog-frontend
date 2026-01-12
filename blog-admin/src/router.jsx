import PostList from "./components/PostList";
import EditForm from "./components/EditForm";
import Login from "./components/Login";
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
      {
        path: "/admin",
        element: <Login />,
      },
    ],
  },
];

export default routes;
