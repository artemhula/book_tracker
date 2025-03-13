import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changeTotalPages } from '../../redux/slices/librarySlice';
import type { Book } from '../../types/Book';
import { setNotification } from '../../redux/slices/notifierSlice';
import { closeModal } from '../../redux/slices/modalSlice';

type Props = {
  book: Book;
};

type Inputs = {
  pages: number;
};

export default function ChangeModal({ book }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onHandle: SubmitHandler<Inputs> = (data) => {
    if (book.totalPages === book.currentPage) {
      dispatch(
        setNotification({
          type: 'Warning',
          text: 'It is impossible to change the number of pages once the book has been read.',
        })
      );
    } else if (book.currentPage && book.currentPage >= data.pages) {
      dispatch(
        setNotification({
          type: 'Warning',
          text: 'The total number of pages cannot be less than your current progress.',
        })
      );
    } else {
      dispatch(changeTotalPages({ isbn: book.isbn, totalPages: data.pages }));
      dispatch(closeModal());
      dispatch(
        setNotification({
          type: 'Success',
          text: 'The book was updated!',
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
    <div className="font-geist text-sm text-gray-800">
      <form
        className="mt-3 flex items-center w-full justify-center"
        onSubmit={handleSubmit(onHandle, onError)}
      >
        <div className="flex flex-col items-center">
          <p className="text-lg">Please enter a new count of pages</p>

          <input
            id="newPages"
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            placeholder={book.totalPages?.toString()}
            {...register('pages', {
              required: 'It is required',
              min: { value: 1, message: 'Minimum 1' },
              max: { value: 9999, message: 'Maximum 9999' },
              valueAsNumber: true,
            })}
            className="font-geist text-xl text-gray-800 mt-2 w-20 h-9 text-center m-auto border-1 border-gray-700 rounded-lg active:border-black caret-transparent"
          />

          <button
            type="submit"
            className="mt-3 w-15 h-9 border-1 font-geist bg-gray-800 text-white rounded-lg -translate-y-0.5 scale-105 cursor-pointer"
          >
            Set
          </button>
        </div>
      </form>
    </div>
  );
}
