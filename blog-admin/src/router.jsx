import PostList from "./components/PostList";
import EditForm from "./components/EditForm";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import Comments from "./components/Comments";
import Error from "./components/Error";
import App from "./App";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <PostList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <EditForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new-post",
        element: (
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/comments",
        element: (
          <ProtectedRoute>
            <Comments />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin",
        element: <Login />,
      },
    ],
  },
];

export default routes;
