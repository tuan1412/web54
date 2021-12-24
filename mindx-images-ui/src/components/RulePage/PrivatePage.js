import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivatePage() {
  const user = useAuth();
  const isMember = !!user;

  return isMember ? <Outlet /> : <Navigate to="/login" />
}

export default PrivatePage;