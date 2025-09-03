import { Toaster } from 'sonner';
import './App.css';
import Modal from './components/Modal/Modal';
import Notifier from './components/Notifier';

import LoginPage from './pages/LoginPage';
import LibraryPage from './pages/LibraryPage';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';

export default function App() {
  const session = useSelector((state: RootState) => state.auth.session);

  return (
    <>
      <header className="bg-white z-10">
        <h1 className="font-geist text-4xl font-bold py-6 mx-auto text-center ">
          Book Tracker
        </h1>
        <hr className="bg-gray-200 border-0 h-px" />
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
