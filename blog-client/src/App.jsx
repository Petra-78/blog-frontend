import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { Outlet } from "react-router";

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
