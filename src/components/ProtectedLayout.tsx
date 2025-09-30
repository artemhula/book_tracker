import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUser,
  selectUser,
  selectUserLoading,
} from '../redux/slices/userSlice';
import { Outlet, Navigate } from 'react-router';
import type { AppDispatch } from '../redux/store';
import { LoadingSpinner } from './LoadingSpinner';

export default function ProtectedLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid min-h-[100vh] w-full place-items-center rounded-lg p-6 lg:overflow-visible">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
