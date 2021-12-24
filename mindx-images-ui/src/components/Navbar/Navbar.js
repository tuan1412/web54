import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import useAuth from "../../hooks/useAuth";
import { logout } from "../../redux/userSlice";

export function AuthenticatedComponent({ children, fallback = null }) {
  const user = useAuth();

  return user ? children(user) : fallback;
}

export default function Navbar() {
  const dispatch = useDispatch();

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
            {(user) => (
              <div>
                Welcome {user.username}
                <Link className="btn btn-link" to="/posts/create">
                  Create post
                </Link>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(logout());
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
