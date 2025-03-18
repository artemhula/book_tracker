import { useDispatch } from 'react-redux';
import noCover from '../assets/images/no-cover.png';
import type { Book } from '../types/Book';
import { showModal } from '../redux/slices/modalSlice';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { useRef, useState } from 'react';

export default function Card(book: Book) {
  const dispatch = useDispatch();
  const [isMenuShowed, setIsMenuShowed] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    holdTimer.current = setTimeout(() => {
      setIsMenuShowed(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const percentage =
    typeof book.currentPage === 'number' &&
    typeof book.totalPages === 'number' &&
    book.totalPages > 0
      ? book.currentPage >= book.totalPages
        ? 100
        : Math.max(1, Math.floor((book.currentPage / book.totalPages) * 100))
      : null;

  return (
    <div
      onClick={() =>
        dispatch(showModal({ modalAction: 'Track', selectedBook: book }))
      }
      onMouseLeave={() => setIsMenuShowed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative group w-65 h-90 bg-white py-4 z-10 overflow-hidden shadow-sm hover:shadow-lg hover:scale-110  hover:cursor-pointer rounded-2xl transition duration-300"
    >
      <img
        className="h-52 object-contain block mx-auto"
        src={book.coverURL ?? noCover}
        alt={book.title}
      />
      <div className="px-8 mt-3">
        <p className=" text-gray-900 font-semibold text-lg text-center truncate">
          {book.title}
        </p>
        <p className=" text-gray-500 text-center truncate">{book.author}</p>
        {percentage ? (
          percentage === 100 ? (
            <>
              <p className="text-2xl text-green-800 font-bold text-center my-2">
                Done
              </p>
              <div className="w-full bg-green-600 rounded-full h-2"></div>
            </>
          ) : (
            <>
              <p className="text-2xl text-black font-bold text-center my-2">
                {percentage}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-blue-400 h-2 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </>
          )
        ) : (
          <>
            <p className="text-lg text-black font-bold text-center mt-2 mb-3">
              Time to start reading
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2"></div>
          </>
        )}
      </div>
      <IoEllipsisHorizontalSharp
        size={25}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuShowed(!isMenuShowed);
        }}
        className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-gray-400 hover:text-gray-500 ${
          isMenuShowed ? 'group-hover:text-gray-500' : ''
        }`}
      />
      {isMenuShowed && (
        <div className="absolute font-geist text-md right-2 top-11 z-13 text-center block text-gray-700 bg-white rounded-lg border border-gray-100 shadow-xl">
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                showModal({ modalAction: 'Change', selectedBook: book })
              );
            }}
            className="py-2 px-4 border-b-2 border-gray-100 hover:bg-amber-100 hover:text-gray-800 transition-colors duration-200 rounded-t-lg"
          >
            Change
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                showModal({ modalAction: 'Delete', selectedBook: book })
              );
            }}
            className="py-2 px-4 hover:bg-red-100 transition-colors hover:text-gray-900 duration-200 rounded-b-lg"
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
