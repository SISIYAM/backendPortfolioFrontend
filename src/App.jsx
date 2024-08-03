import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contex/AuthContex";
function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
