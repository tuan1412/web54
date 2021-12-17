import React from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';

import { MainLayout } from '../../components/Layout';
export default function PostDetail() {
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(params, location, Object.fromEntries([...searchParams]));

  const { postId } = params;

  return (
    <MainLayout>
      <div>Đây là trang post detail {postId}</div>
    </MainLayout>
  )
}
