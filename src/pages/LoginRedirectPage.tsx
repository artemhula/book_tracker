import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { fetchUser } from '../redux/slices/userSlice';
import type { AppDispatch } from '../redux/store';

export default function LoginRedirectPage() {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      dispatch(fetchUser())
        .unwrap()
        .then(() => {
          navigate('/');
        });
    }
  }, [location, dispatch, navigate]);

  return (
    <div className="w-full h-200 flex items-center justify-center">
      <p className="font-geist text-3xl font-semibold">Please wait...</p>
    </div>
  );
}
