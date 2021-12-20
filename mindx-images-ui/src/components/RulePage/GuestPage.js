// logic: 
// member truy cập thì chuyển sang trang home
// khách thì render bình thường

import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function GuestPage() {
  const { user } = useAuth();
  const isMember = !!user;

  return !isMember ? <Outlet /> : <Navigate to="/" />
}

export default GuestPage;