// ProtectedLayout.jsx
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

const ProtectedLayout = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
