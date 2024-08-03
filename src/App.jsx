import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contex/AuthContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <AuthProvider>
        <Outlet />
        <ToastContainer theme="dark" />
      </AuthProvider>
    </>
  );
}

export default App;
