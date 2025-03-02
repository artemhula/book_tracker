import './App.css';
import AddBookCard from './components/AddBookCard';
import Card from './components/Card';
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
      <main className="container md:mx-auto">
        <div className="my-10 mx-auto flex flex-wrap justify-center gap-10">
          <AddBookCard onClick={addNewBookModal.openModal} />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
      <Modal
        title={'Add a new book'}
        isOpened={addNewBookModal.isOpened}
        onClose={addNewBookModal.closeModal}
      >
        <ISBNForm />
      </Modal>
    </>
  );
}

export default App;
