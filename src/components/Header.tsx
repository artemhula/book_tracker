import UserBar from './UserBar';

type Props = {
  userBarActive?: boolean;
};

export const Header = ({ userBarActive = true }: Props) => {
  return (
    <header className="font-geist bg-white z-10 relative flex items-center justify-center">
      <h1 className="font-zalando text-3xl md:text-4xl font-bold py-6 text-center w-full select-none">
        Book Tracker
      </h1>

      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2">
        {userBarActive && <UserBar />}
      </div>

      <hr className="bg-gray-200 border-0 h-px absolute bottom-0 left-0 w-full" />
    </header>
  );
};
