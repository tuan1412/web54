import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/Layout';

export default function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  }
  return (
    <MainLayout>
      Đây là trang tạo bài post
      <button className="btn" onClick={handleSubmit}>Submit</button>
    </MainLayout>
  )
}
