import { useForm } from 'react-hook-form';
import type { Book } from '../../types/Book';
import Button from './../Button';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import noCover from '../../assets/images/no-cover.png';
import { useDispatch } from 'react-redux';
import TotalPagesChanger from './TotalPagesChanger';
import { changeCurrentPage } from '../../redux/slices/librarySlice';
import { closeModal } from '../../redux/slices/modalSlice';
import type { AppDispatch } from '../../redux/store';

type ChangerProps = {
  book: Book;
};

type FormValues = {
  currentPage: number;
};

export default function TrackModal({ book }: ChangerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { register, setValue, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: { currentPage: book.currentPage ?? 0 },
    mode: 'onChange',
  });

  const validatePages = (value: number) =>
    value > 0 && value <= (book.totalPages ?? 0);

  const handleMinusButton = () => {
    const value = getValues('currentPage');
    if (validatePages(value - 1)) setValue('currentPage', value - 1);
  };

  const handlePlusButton = () => {
    const value = getValues('currentPage');
    if (validatePages(value + 1)) setValue('currentPage', value + 1);
  };

  const onSubmit = (data: FormValues) => {
    dispatch(
      changeCurrentPage({ id: book.id!, currentPage: data.currentPage })
    );
    dispatch(closeModal());
  };

  return (
    <div className="font-geist flex p-2 md:p-4 justify-center md:justify-evenly">
      <img
        className="w-35 md:w-45 object-contain block"
        src={book.coverUrl ?? noCover}
        alt={book.title}
      />
      <div className="flex flex-col items-center justify-between ml-3 md:ml-6">
        <div>
          <p className="text-gray-900 font-semibold text-xl mb-1 text-center truncate">
            {book.title}
          </p>
          <p className="text-gray-500 text-sm text-center truncate">
            {book.author}
          </p>
        </div>

        {!book.totalPages ? (
          <TotalPagesChanger book={book} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <div className="flex flex-row items-center mb-2">
                <button
                  type="button"
                  onClick={handleMinusButton}
                  className="text-gray-800 text-xl cursor-pointer"
                >
                  <FaMinus />
                </button>
                <input
                  id="current"
                  type="number"
                  onInput={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.value.length > 1 && input.value.startsWith('0')) {
                      input.value = input.value.replace(/^0+/, '');
                    }
                    if (parseInt(input.value) > (book.totalPages ?? 1)) {
                      input.value = book.totalPages!.toString();
                    }
                    if (parseInt(input.value) < 1) {
                      input.value = '0';
                    }
                  }}
                  {...register('currentPage', {
                    required: 'Enter a page',
                    min: { value: 1, message: 'Minimum 1' },
                    max: {
                      value: book.totalPages ?? 1,
                      message: `Maximum ${book.totalPages}`,
                    },
                    valueAsNumber: true,
                    validate: validatePages,
                  })}
                  className="font-bold text-4xl md:text-5xl text-gray-800 w-30 md:w-40 m-auto text-center appearance-none outline-0"
                />
                <button
                  type="button"
                  onClick={handlePlusButton}
                  className="text-gray-800 text-xl cursor-pointer"
                >
                  <FaPlus />
                </button>
              </div>
              <p className="text-gray-500 text-sm text-center">
                Total pages: {book.totalPages}
              </p>
            </div>
            <Button text="Track" />
          </form>
        )}
      </div>
    </div>
  );
}
