import AnimatedBlobs from '../components/AnimatedBlobs';
import CardList from '../components/CardList';
import { Toaster } from 'sonner';
import Modal from '../components/Modal/Modal';
import Notifier from '../components/Notifier';
import UserBar from '../components/UserBar';

export default function LibraryPage() {
  return (
    <>
      <header className="font-geist bg-white z-10 relative flex items-center justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold py-6 text-center w-full">
          Book Tracker
        </h1>

        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2">
          <UserBar />
        </div>

        <hr className="bg-gray-200 border-0 h-px absolute bottom-0 left-0 w-full" />
      </header>

      <main className="font-geist">
        <div className="container mx-auto relative w-full max-w-7xl">
          <AnimatedBlobs />
          <CardList />
        </div>
      </main>

      <Modal />

      <Notifier />

      <Toaster position="top-right" />
    </>
  );
}
