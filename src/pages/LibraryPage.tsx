import AnimatedBlobs from '../components/AnimatedBlobs';
import CardList from '../components/CardList';
import { Toaster } from 'sonner';

export default function LibraryPage() {
  return (
    <>
      <div className="container mx-auto relative w-full max-w-7xl">
        <AnimatedBlobs />
        <CardList />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
