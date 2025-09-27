import { Link, useNavigate } from 'react-router';
import { IoStatsChart } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import UserBar from './UserBar';

type Props = {
  showUserBar?: boolean;
  showStatsButton?: boolean;
  showHomeButton?: boolean;
};

export const Header = ({
  showUserBar = true,
  showStatsButton = false,
  showHomeButton = true,
}: Props) => {
  return (
    <header className="font-geist bg-white z-10 relative flex items-center justify-center">
      <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex gap-3">
        {showHomeButton && (
          <Link to="/">
            <AiFillHome className="text-gray-800 cursor-pointer" size={30} />
          </Link>
        )}
        {showStatsButton && (
          <Link to="/stats">
            <IoStatsChart className="text-gray-800 cursor-pointer" size={30} />
          </Link>
        )}
      </div>
      <Link
        to={{
          pathname: '/',
        }}
      >
        <h1 className="font-zalando text-[28px] md:text-4xl font-bold py-6 text-center w-full select-none cursor-pointer">
          Book Tracker
        </h1>
      </Link>

      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2">
        {showUserBar && <UserBar />}
      </div>

      <hr className="bg-gray-200 border-0 h-px absolute bottom-0 left-0 w-full" />
    </header>
  );
};
