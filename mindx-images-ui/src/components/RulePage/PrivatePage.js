// logic: 
// member truy cập bt
// nếu k là member thì chuyển sang /login
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivatePage() {
  const { user } = useAuth();
  const isMember = !!user;

  // React.useEffect(() => {
  //   Navigate('/')
  // },[]);

  return isMember ? <Outlet /> : <Navigate to="/login" />
}

export default PrivatePage;