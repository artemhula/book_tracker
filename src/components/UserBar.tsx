import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signOut } from '../redux/slices/authSlice';
import type { AppDispatch } from '../redux/store';

export default function UserBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const name = user?.user_metadata?.name || user?.email || 'User';
  const avatar = user?.user_metadata?.avatar_url;
  console.log(avatar);

  return (
    <div className="font-geist flex gap-4 items-center">
      <div className="flex flex-col">
        <p className="font-geist text-lg text-gray-800 font-semibold">{name}</p>
        <button
          className="cursor-pointer text-gray-700"
          onClick={() => {
            dispatch(signOut());
          }}
        >
          Logout
        </button>
      </div>
      {avatar && (
        <img
          className="w-10 h-10 rounded-full"
          src={avatar}
          alt="Avatar"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
