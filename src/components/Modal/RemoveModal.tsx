import { useDispatch } from 'react-redux';
import type { Book } from '../../models/Book';
import { setNotification } from '../../redux/slices/notifierSlice';
import { closeModal } from '../../redux/slices/modalSlice';
import { deleteBook } from '../../redux/slices/librarySlice';
import type { AppDispatch } from '../../redux/store';

type Props = {
  book: Book;
};

export default function RemoveModal({ book }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="font-geist text-gray-800">
      <p className="text-lg text-center">
        Are you sure want to delete this book?
      </p>
      <div className="flex gap-3 justify-center my-3">
        <button
          onClick={() => {
            dispatch(deleteBook(book.id!));
            dispatch(closeModal());
            dispatch(
              setNotification({
                type: 'Success',
                text: 'The book was deleted succesfully!',
              })
            );
          }}
          className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => {
            dispatch(closeModal());
          }}
          className="px-4 py-1 rounded-lg border-2 border-gray-300 hover:bg-gray-50  cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
