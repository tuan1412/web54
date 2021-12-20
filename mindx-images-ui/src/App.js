import React from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import request from './api/request';
import { GuestPage, PrivatePage } from './components/RulePage';

export const AuthContext = React.createContext();

function App() {
  const [status, setStatus] = React.useState("idle");
  const [user, setUser] = React.useState(null);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("done");
      return;
    }

    try {
      const res = await request({
        url: '/auth/me',
        method: 'GET'
      });
      if (res.success) {
        setUser(res.data);
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  React.useEffect(() => {
    fetchUserInfo()
  }, []);

  if (status === "idle" || status === "loading") return <div>Full page loading...</div>

  if (status === "error") return <div>Error</div>

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />

        <Route element={<PrivatePage />}>
          <Route path="/posts/create" element={<CreatePost />} />
        </Route>
  
        <Route element={<GuestPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      
        <Route path="*" element={<div>404 Page</div>} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

// 
// /login => <PrivatePage><CreatePost /></PrivatePage>