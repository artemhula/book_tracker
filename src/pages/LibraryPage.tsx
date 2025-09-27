import AnimatedBlobs from '../components/AnimatedBlobs';
import CardList from '../components/CardList';
import Modal from '../components/Modal/Modal';
import Notifier from '../components/Notifier';
import { Header } from '../components/Header';
import { useEffect } from 'react';
import { fetchBooks } from '../redux/slices/librarySlice';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../redux/store';

export default function LibraryPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <>
      <Header showHomeButton={false} showStatsButton={true} />

      <main className="font-geist">
        <div className="container mx-auto relative w-full max-w-7xl">
          <AnimatedBlobs />
          <CardList />
        </div>
      </main>

      <Modal />

      <Notifier />
    </>
  );
}
