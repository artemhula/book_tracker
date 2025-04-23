import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signOut } from '../redux/slices/authSlice';
import type { AppDispatch } from '../redux/store';
import { useState } from 'react';

export default function UserBar() {
  const user = useSelector(selectUser);
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const name = user?.user_metadata?.name || user?.email || 'User';
  const avatar = user?.user_metadata?.avatar_url;
  console.log(avatar);

  return (
    <div className="font-geist relative flex gap-4 items-center">
      <div className="hidden md:flex flex-col">
        <p className="text-lg text-gray-800 font-semibold">{name}</p>
        <button
          className="cursor-pointer text-gray-700"
          onClick={() => {
            dispatch(signOut());
          }}
        >
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
        <div className="absolute text-lg right-1 top-16 text-center block text-gray-700 bg-white rounded-lg border border-gray-100 shadow-xl">
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(signOut());
            }}
            className="py-2 px-4 border-gray-100 "
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
