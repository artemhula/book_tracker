import noImage from '../../assets/images/no-cover.png';
import type { Book } from '../../types/Book';

export const FindedBook = (book: Book) => {
  return (
    <>
      <img
        src={book.coverURL ?? noImage}
        alt={book.title}
        className="w-12 h-16 mr-3 object-contain"
      />
      <div className="flex justify-center flex-col">
        <p className="font-geist text-gray-900 font-semibold text-lg  ">
          {book.title}
        </p>
        <p className="font-geist text-gray-500 font-md ">{book.author}</p>
      </div>
    </>
  );
};
