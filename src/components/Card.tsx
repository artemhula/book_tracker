import { useDispatch } from 'react-redux';
import noCover from '../assets/images/no-cover.png';
import type { Book } from '../types/Book';
import { showModal } from '../redux/slices/modalSlice';

export default function Card(book: Book) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(showModal({ modalAction: 'Track', selectedBook: book }))
      }
      className="w-65 h-90 bg-white py-4 overflow-hidden shadow-sm hover:shadow-lg hover:scale-110  hover:cursor-pointer rounded-2xl transition duration-300"
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
        <p className="font-geist text-2xl text-black font-bold text-center my-2">
          78%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-400 h-2 rounded-full w-45"></div>
        </div>
      </div>
    </div>
  );
}
