import React, { useEffect } from "react";

import { useAuth } from "../contex/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Home() {
  const { verifyLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await verifyLoggedIn();
        console.log("Is logged in:", isLoggedIn);
        if (!isLoggedIn) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
    </>
  );
}

export default Home;
