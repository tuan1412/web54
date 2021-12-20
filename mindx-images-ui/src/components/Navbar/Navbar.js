import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function AuthenticatedComponent({ children, fallback = null }) {
  const { user, setUser } = useAuth();

  return user ? children(user, setUser) : fallback;
}

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <Link className="navbar-brand" to="/">
            MindX Images
          </Link>
          <AuthenticatedComponent
            fallback={
              <div>
                <Link className="btn btn-link" to="/login">
                  Login
                </Link>
                <Link className="btn btn-link" to="/register">
                  Signup
                </Link>
              </div>
            }
          >
            {(user, setUser) => (
              <div>
                Welcome {user.username}
                <Link className="btn btn-link" to="/posts/create">
                  Create post
                </Link>
                <button
                  className="btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </AuthenticatedComponent>
        </div>
      </div>
    </nav>
  );
}
