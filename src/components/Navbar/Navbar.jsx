import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ borderBottom: "1px solid black" }}
    >
      <Link className="navbar-brand text-light" to="/">
        Siyam
      </Link>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link text-light" to="/">
              Home <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/project/add">
              Add Project
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
