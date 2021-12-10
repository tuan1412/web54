import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <a className="navbar-brand" href="#">MindX Images</a>
          <button className="btn btn-link">Login</button>
          <button className="btn btn-link">Signup</button>
        </div>
      </div>
    </nav>
  );
}
