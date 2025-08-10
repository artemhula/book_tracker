import './App.css';
import AddBookCard from './components/AddBookCard';
import CardList from './components/CardList';
import { ISBNForm } from './components/ISBNForm/ISBNForm';
import Modal from './components/Modal';
import { useModal } from './hooks/useModal';

function App() {
  const addNewBookModal = useModal();

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
          <AddBookCard onClick={addNewBookModal.openModal} />
          <CardList />
        </div>
      </main>
      <Modal
        title={'Add a new book'}
        isOpened={addNewBookModal.isOpened}
        onClose={addNewBookModal.closeModal}
      >
        <ISBNForm onSuccess={addNewBookModal.closeModal} />
      </Modal>
    </>
  );
}

export default App;
