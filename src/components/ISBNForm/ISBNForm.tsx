import React, { useEffect, useState } from 'react';
import { useLazyGetBookByISBNQuery } from '../../api/BookService';
import { FindedBook } from './FindedBook';
import { LoadingSpinner } from './LoadingSpinner';
import { HintISBN } from './ISBNHint';
import { NotFound } from './NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, selectBookByISBN } from '../../redux/slices/librarySlice';
import { useGetBookCoverByISBNQuery } from '../../api/CoverService';
import Button from '../Button';
import { closeModal } from '../../redux/slices/modalSlice';
import { setNotification } from '../../redux/slices/notifierSlice';
import type { AppDispatch, RootState } from '../../redux/store';

export const ISBNForm = () => {
  const [isbn, setIsbn] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [trigger, { data: book, isLoading }] = useLazyGetBookByISBNQuery();

  useEffect(() => {
    if (isbn.length === 13) trigger(isbn);
  }, [isbn]);

  const { data: cover } = useGetBookCoverByISBNQuery(book?.isbn ?? '', {
    skip: !book,
  });

  const foundBook = book ? { ...book, coverURL: cover ?? null } : null;

  const existingBook = useSelector((state: RootState) =>
    foundBook ? selectBookByISBN(state, foundBook.isbn) : null
  );

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (foundBook) {
      if (!existingBook) {
        dispatch(closeModal());
        dispatch(addBook(foundBook));

        dispatch(
          setNotification({
            type: 'Success',
            text: 'Book has been successfully added',
          })
        );
      } else {
        dispatch(
          setNotification({
            type: 'Warning',
            text: 'This book has already been added',
          })
        );
      }
    } else {
      dispatch(
        setNotification({
          type: 'Warning',
          text: 'Please, find a book to add',
        })
      );
    }
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
        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 font-geist text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        placeholder="123-456-789-000-0"
        required
      />
      <div className="bg-gray-50 mb-5 border border-gray-400 w-full h-25 rounded-lg p-4 flex">
        {isbn.length < 13 ? (
          <HintISBN />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : foundBook ? (
          <FindedBook {...foundBook} />
        ) : (
          <NotFound />
        )}
      </div>
      <div className="flex flex-row justify-end">
        <Button disabled={!book} text="Add" />
      </div>
    </form>
  );
};
