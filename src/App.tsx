import { Toaster } from 'sonner';
import './App.css';
import AddBookCard from './components/AddBookCard';
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
          <div className="my-10 mx-auto flex flex-wrap justify-center gap-10">
            <AddBookCard />
            <CardList />
          </div>
          <div></div>
        </div>
        <Toaster position="top-right" />
      </main>
      <Modal />
      <Notifier />
      {/* <Changer
          {...{
            isbn: 9786171299085,
            title: 'Бійцівський клуб',
            author: 'Чак Поланік',
            pages: 0,
            coverURL:
              'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1677866602i/123171738.jpg',
          }}
        /> */}
    </>
  );
}

export default App;
