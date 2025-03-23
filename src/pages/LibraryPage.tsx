import AnimatedBlobs from '../components/AnimatedBlobs';
import CardList from '../components/CardList';
import { Toaster } from 'sonner';
import Modal from '../components/Modal/Modal';
import Notifier from '../components/Notifier';
import { Header } from '../components/Header';

export default function LibraryPage() {
  return (
    <>
      <Header />

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
