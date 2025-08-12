import './App.css';
import AddBookCard from './components/AddBookCard';
import CardList from './components/CardList';
import Modal from './components/Modal';

function App() {
  return (
    <>
      <header>
        <h1 className="font-geist text-4xl font-bold my-5 mx-auto text-center ">
          Book Tracker
        </h1>
        <hr className="bg-gray-200 border-0 h-px" />
      </header>
      <main>
        <div className="container mx-auto"></div>
        <div className="my-10 mx-auto flex flex-wrap justify-center gap-10">
          <AddBookCard />
          <CardList />
        </div>
      </main>
      <Modal />
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
