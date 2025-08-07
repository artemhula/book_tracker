import React, { useEffect, useState } from 'react';
import BookService from '../../api/BookService';
import { useFetching } from '../../hooks/useFetching';
import { FindedBook } from './FindedBook';
import { LoadingSpinner } from './LoadingSpinner';
import { HintISBN } from './ISBNHint';
import type { Book } from '../../types/Book';
import { NotFound } from './NotFound';

export const ISBNForm = () => {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState<Book | null>(null);
  const [fetchBook, isLoading, error] = useFetching(async () => {
    const findedBook = await BookService.getBookByISBN(isbn);
    if (findedBook) {
      setBook(findedBook);
    }
    console.log(findedBook);
  });

  useEffect(() => {
    if (isbn.length === 13) {
      fetchBook();
    }
    if (isbn.length != 13 && book) {
      setBook(null);
    }
  }, [isbn]);

  const formatISBN = (value: string) =>
    value
      .replace(/\D/g, '')
      .slice(0, 13)
      .match(/.{1,3}/g)
      ?.join('-') ?? '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/-/g, '').slice(0, 13);
    setIsbn(raw);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label
        htmlFor="isbn"
        className="block mb-2 text-lg font-geist font-medium text-gray-900"
      >
        Please type ISBN
      </label>
      <input
        id="isbn"
        value={formatISBN(isbn)}
        onChange={handleChange}
        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        placeholder="123-456-789-000-0"
        required
      />
      <div className="bg-gray-50 mb-8 border border-gray-400 w-full h-25 rounded-lg p-4 flex">
        {isbn.length < 13 ? (
          <HintISBN />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : book ? (
          <FindedBook {...book} />
        ) : (
          <NotFound />
        )}
      </div>
      <div className="flex-row items-end">
        <button
          type="submit"
          className="px-4 py-2 w-25 bg-gray-900 text-white rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
};
