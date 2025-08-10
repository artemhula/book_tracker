import { useSelector } from 'react-redux';
import { selectBooks } from '../redux/slices/librarySlice';
import Card from './Card';

export default function CardList() {
  const books = useSelector(selectBooks);
  console.log(books);

  return (
    <>
      {books.map((book) => (
        <Card {...book} />
      ))}
    </>
  );
}
