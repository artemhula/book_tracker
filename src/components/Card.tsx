import { useDispatch } from 'react-redux';
import noCover from '../assets/images/no-cover.png';
import type { Book } from '../types/Book';
import { showModal } from '../redux/slices/modalSlice';

export default function Card(book: Book) {
  const dispatch = useDispatch();

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
      className="w-65 h-90 bg-white py-4 z-10 overflow-hidden shadow-sm hover:shadow-lg hover:scale-110  hover:cursor-pointer rounded-2xl transition duration-300"
    >
      <img
        className="h-52 object-contain block mx-auto"
        src={book.coverURL ?? noCover}
        alt={book.title}
      />
      <div className="px-8 mt-3">
        <p className="font-geist text-gray-900 font-semibold text-lg text-center truncate">
          {book.title}
        </p>
        <p className="font-geist text-gray-500 text-center truncate">
          {book.author}
        </p>
        {percentage ? (
          percentage === 100 ? (
            <>
              <p className="font-geist text-2xl text-green-800 font-bold text-center my-2">
                Done
              </p>
              <div className="w-full bg-green-600 rounded-full h-2"></div>
            </>
          ) : (
            <>
              <p className="font-geist text-2xl text-black font-bold text-center my-2">
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
            <p className="font-geist text-lg text-black font-bold text-center mt-2 mb-3">
              Time to start reading
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2"></div>
          </>
        )}
      </div>
    </div>
  );
}
