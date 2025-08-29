import { Toaster } from 'sonner';
import './App.css';
import AnimatedBlobs from './components/AnimatedBlobs';
import CardList from './components/CardList';
import Modal from './components/Modal/Modal';
import Notifier from './components/Notifier';

function App() {
  return (
    <>
      <header className="bg-white z-10">
        <h1 className="font-geist text-4xl font-bold py-6 mx-auto text-center ">
          Book Tracker
        </h1>
        <hr className="bg-gray-200 border-0 h-px" />
      </header>
      <main>
        <div className="container mx-auto relative w-full max-w-7xl">
          <AnimatedBlobs />
          <CardList />
        </div>
        <Toaster position="top-right" />
      </main>
      <Modal />
      <Notifier />
    </>
  );
}

export default App;
