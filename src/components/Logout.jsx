import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      localStorage.removeItem("auth-token");
      console.log({ success: true, message: "Logout successfully" });
    }
    navigate("/login");
  }, []);

  return <div></div>;
}

export default Logout;
