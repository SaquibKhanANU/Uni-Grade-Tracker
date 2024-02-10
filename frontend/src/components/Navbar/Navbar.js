import "./Navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a className="navbar-header" href="/">
            Course Grade Tracker
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
