import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./login.css";
import { loginUrl } from "../../myConst";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("sam@sam.com");
  const [password, setPassword] = useState("savoma");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      await axios
        .post(loginUrl, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem(
              "auth-token",
              response.data.authenticationToken
            );
          }
          if (
            localStorage.getItem("auth-token") ==
            response.data.authenticationToken
          ) {
            // i want to redirect in "/" this path after auth-token saved successfully
            console.log({
              success: true,
              message: "Verified successfully",
              token: localStorage.getItem("auth-token"),
            });

            navigate("/");
          }
        });
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="loginBody">
      <div className="content">
        <div className="text">Login Form</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="bi bi-person" />
            <label>Email or Phone</label>
          </div>
          <div className="field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="bi bi-lock" />
            <label>Password</label>
          </div>
          <div className="forgot-pass">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="loginBtn">
            Sign in
          </button>
          <div className="sign-up">
            Not a member?
            <a href="#">signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
