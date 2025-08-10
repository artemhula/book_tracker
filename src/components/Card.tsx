import noCover from '../assets/images/no-cover.png';
import type { Book } from '../types/Book';

export default function Card(book: Book) {
  return (
    <div className="w-65 h-90 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:scale-110  hover:cursor-pointer rounded-2xl transition duration-300">
      <img
        className="h-55 object-contain block mx-auto"
        src={book.coverURL ?? noCover}
        alt={book.title}
      />
      <div className="px-6 py-4">
        <p className="font-geist text-gray-900 font-semibold text-lg mb-1 text-center">
          {book.title}
        </p>
        <p className="font-geist text-gray-500 font-md text-center">
          {book.author}
        </p>
        <p className="font-geist text-2xl text-black font-bold text-center my-3">
          78%
        </p>
      </div>
    </div>
  );
}
