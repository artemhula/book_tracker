import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changeTotalPages } from '../redux/slices/librarySlice';
import type { Book } from '../types/Book';

type Props = {
  book: Book;
};

type Inputs = {
  pages: number;
};

export default function TotalPagesChanger({ book }: Props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleTotalPagesChange: SubmitHandler<Inputs> = (data) =>
    dispatch(changeTotalPages({ isbn: book.isbn, totalPages: data.pages }));

  return (
    <div className="font-geist text-sm text-gray-800">
      Unfortunately, we do not have information about the number of pages in
      this book. But you can enter it yourself.
      <form
        className="mt-3 flex items-center"
        onSubmit={handleSubmit(handleTotalPagesChange)}
      >
        <div>
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
            className="font-geist text-xl text-gray-800 mt-2 w-20 h-9 text-center m-auto border-1 border-gray-700 rounded-lg active:border-black caret-transparent"
          />
          <button
            type="submit"
            className="ml-5 w-15 h-9 border-1 font-geist bg-gray-800 text-white rounded-lg -translate-y-0.5 scale-105 cursor-pointer"
          >
            Set
          </button>
        </div>
      </form>
    </div>
  );
}
