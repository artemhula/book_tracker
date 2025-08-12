import { useForm } from 'react-hook-form';
import type { Book } from '../types/Book';
import Button from './Button';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import noCover from '../assets/images/no-cover.png';
import { useDispatch } from 'react-redux';
import TotalPagesChanger from './TotalPagesChanger';
import { changeCurrentPage } from '../redux/slices/librarySlice';
import { closeModal } from '../redux/slices/modalSlice';

type ChangerProps = {
  book: Book;
};

type FormValues = {
  currentPage: number;
};

export default function Changer({ book }: ChangerProps) {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    // formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: { currentPage: book.currentPage ?? 0 },
    mode: 'onChange',
  });

  const validatePages = (value: number) =>
    value > 0 && value <= (book.totalPages ?? 0);

  const handleMinusButton = () => {
    const value = getValues('currentPage');
    if (validatePages(value - 1)) {
      setValue('currentPage', value - 1);
    }
  };

  const handlePlusButton = () => {
    const value = getValues('currentPage');
    if (validatePages(value + 1)) {
      setValue('currentPage', value + 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    dispatch(
      changeCurrentPage({ isbn: book.isbn, currectPage: data.currentPage })
    );
    dispatch(closeModal());
  };

  return (
    <div className="flex p-4 justify-evenly">
      <img
        className="h-55 object-contain block"
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
          <TotalPagesChanger book={book} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="flex flex-row items-center mb-8">
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
                className="font-geist font-bold text-5xl text-gray-800 w-40 m-auto text-center appearance-none outline-0"
              />
              <button
                type="button"
                onClick={handlePlusButton}
                className="text-gray-800 text-xl cursor-pointer"
              >
                <FaPlus />
              </button>
            </div>
            {/* {errors.currentPage && (
              <p className="text-red-500 text-center mt-2">
                {errors.currentPage.message}
              </p>
            )} */}
            <Button text="Track" />
          </form>
        )}
      </div>
    </div>
  );
}
