import PostList from "./components/PostList/PostList";
import EditForm from "./components/EditForm/EditForm";
import Login from "./components/Login/Login";
import NewPost from "./components/NewPost/NewPost";
import Comments from "./components/Comments/Comments";
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
