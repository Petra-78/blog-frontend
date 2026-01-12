import "./App.css";
import { Outlet } from "react-router";
import { useAuth } from "./context/authContext";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
