import type { Book } from '../types/Book';
import Button from './Button';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import noCover from '../assets/images/no-cover.png';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changeTotalPages } from '../redux/slices/librarySlice';

type ChangerProps = {
  book: Book;
};

export default function Changer({ book }: ChangerProps) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  type Inputs = {
    pages: number;
  };

  const handleTotalPagesChange: SubmitHandler<Inputs> = (data) =>
    dispatch(changeTotalPages({ isbn: book.isbn, pages: data.pages }));

  return (
    <div className="flex p-4 justify-evenly">
      <img
        className="h-55 object-contain block "
        src={book.coverURL ?? noCover}
        alt={book.title}
      />
      <div className="flex flex-col items-center justify-between ml-6">
        <div>
          <p className="font-geist text-gray-900 font-semibold text-xl mb-1 text-center truncate">
            {book.title}
          </p>
          <p className="font-geist text-gray-500 text-sm text-center truncate">
            {book.author}
          </p>
        </div>

        {!book.totalPages ? (
          <div className="font-geist text-sm text-gray-800">
            Unfortunately, we do not have information about the number of pages
            in this book. But you can enter it yourself.
            <div className="mt-3">
              {errors.pages ? (
                <div className="font-geist text-red-500">
                  {errors.pages.message?.toString()}
                </div>
              ) : (
                <p>Please enter a count of pages</p>
              )}
              <input
                id="newPages"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={4}
                placeholder="0"
                {...register('pages', {
                  required: 'It is required',
                  min: { value: 1, message: 'Minimum 1' },
                  max: { value: 9999, message: 'Maximum 9999' },
                  valueAsNumber: true,
                })}
                className="font-geist text-xl text-gray-800 mt-2 w-20 h-9 text-center m-auto border-1 border-gray-700 rounded-lg  active:border-black  caret-transparent "
              />
              <button
                type="button"
                onClick={handleSubmit(handleTotalPagesChange)}
                className="ml-5 w-15 h-9 border-1 font-geist bg-gray-800 text-white rounded-lg -translate-y-0.5 scale-105 cursor-pointer"
              >
                Set
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="p-2 w-8 h-8 bg-gray-800 text-white rounded-lg"
              >
                <FaMinus />
              </button>
              <input
                id="pages"
                type="number"
                value={123}
                className="font-geist font-bold text-6xl text-gray-800 w-45 m-auto text-center appearance-none outline-0 caret-transparent"
              />
              <button
                type="button"
                className="p-2 w-8 h-8 bg-gray-800 text-white rounded-lg"
              >
                <FaPlus />
              </button>
            </div>
            <Button disabled={!book} text="Track" />
          </>
        )}
      </div>
    </div>
  );
}
