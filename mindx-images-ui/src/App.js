import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import { GuestPage, PrivatePage } from './components/RulePage';
import { fetchUserInfo } from './redux/userSlice';

function App() {
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <div>Full page loading...</div>

  if (status === "error") return <div>Error</div>

  return (
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
  );
}

export default App;

// 
// /login => <PrivatePage><CreatePost /></PrivatePage>