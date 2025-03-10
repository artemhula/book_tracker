import { useForm } from 'react-hook-form';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { setNotification } from '../redux/slices/notifierSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { addBook, selectBooks } from '../redux/slices/librarySlice';
import { closeModal } from '../redux/slices/modalSlice';

type ManualFormValues = {
  title: string;
  author: string;
  isbn: string;
  totalPages: number;
};

export default function ManualForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ManualFormValues>();

  const books = useSelector(selectBooks);

  const onSubmit = (bookData: ManualFormValues) => {
    const book = books.find((b) => b.isbn === bookData.isbn);
    if (!book) {
      dispatch(addBook({ ...bookData, coverURL: null, currentPage: null }));
      dispatch(closeModal());
      dispatch(
        setNotification({ type: 'Success', text: 'Book was added succesfully' })
      );
    } else {
      dispatch(
        setNotification({
          type: 'Error',
          text: 'Book with this ISBN already exists',
        })
      );
    }
  };

  const onError = (formErrors: typeof errors) => {
    Object.values(formErrors).forEach((error) => {
      dispatch(
        setNotification({
          type: 'Warning',
          text: error?.message ?? '',
        })
      );
      console.log(error?.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <label
          htmlFor="isbn"
          className="block mb-2 text-lg font-geist font-medium text-gray-900"
        >
          Adding a book manually
        </label>
        <div className="mt-4 flex flex-col l h-full justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-geist">Title</p>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Title is required' })}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 font-geist rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                placeholder="Please enter title"
              />
            </div>

            <div>
              <p className="font-geist">Author</p>
              <input
                type="text"
                id="author"
                {...register('author', { required: 'Author is required' })}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 font-geist rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                placeholder="Please enter author"
              />
            </div>

            <div>
              <p className="font-geist flex items-center gap-1">
                ISBN
                <span className="relative group">
                  <BsQuestionCircleFill
                    size={14}
                    className="text-gray-400 cursor-pointer"
                  />
                  <div className="absolute opacity-90 font-geist left-5 top-1/2 -translate-y-1/2 z-10 hidden group-hover:block px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg w-60">
                    ISBN is a unique identification number assigned to each
                    book. It can be found under the barcode or on the first
                    pages of the book.
                  </div>
                </span>
              </p>
              <input
                id="isbn"
                {...register('isbn', {
                  required: 'ISBN is required',
                  pattern: {
                    value: /^\d{13}$/,
                    message: 'ISBN must be 13 digits',
                  },
                })}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 font-geist rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                placeholder="1234567890000"
              />
            </div>

            <div>
              <p className="font-geist">Count of pages</p>
              <input
                type="number"
                id="totalPages"
                {...register('totalPages', {
                  required: 'Pages is required',
                  min: { value: 1, message: 'Minimum 1 page' },
                  max: { value: 9999, message: 'Maximum 9999 pages' },
                  valueAsNumber: true,
                })}
                className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 font-geist rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <Button text="Add" />
          </div>
        </div>
      </div>
    </form>
  );
}
