import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signOut } from '../redux/slices/userSlice';
import type { AppDispatch } from '../redux/store';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function UserBar() {
  const user = useSelector(selectUser);
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const name = user?.fullName || user?.email || '';
  const avatar = user?.avatarUrl || '';

  const handleLogout = async () => {
    await dispatch(signOut());
    navigate('/login');
  };

  return (
    <div className="font-geist relative flex gap-4 items-center">
      <div className="hidden md:flex flex-col">
        <p className="text-lg text-gray-800 font-semibold">{name}</p>

        <button className="cursor-pointer text-gray-700" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <img
        className="w-10 h-10 rounded-full"
        src={avatar}
        alt="Avatar"
        referrerPolicy="no-referrer"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuShowed(!isMenuShowed);
        }}
      />

      {isMenuShowed && (
        <div className="absolute text-lg right-1 top-18 text-center block md:hidden text-gray-700 bg-white rounded-lg border border-gray-100 shadow-xl">
          <div
            onClick={handleLogout}
            className="py-2 px-4 border-gray-100 md:hidden"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
