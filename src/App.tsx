import { Toaster } from 'sonner';
import Modal from './components/Modal/Modal';
import Notifier from './components/Notifier';
import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import UserBar from './components/UserBar';

export default function App() {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <>
      <header className="bg-white z-10 relative flex items-center justify-center">
        <h1 className="font-geist text-4xl font-bold py-6 text-center w-full">
          Book Tracker
        </h1>
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          {session?.user && <UserBar />}
        </div>
        <hr className="bg-gray-200 border-0 h-px absolute bottom-0 left-0 w-full" />
      </header>
      <main>
        {session ? <LibraryPage /> : <LoginPage />}
        <Toaster position="top-right" />
      </main>
      <Modal />
      <Notifier />
    </>
  );
}
