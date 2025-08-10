import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../types/Book';
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const bookAPI = createApi({
  reducerPath: 'bookAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: (build) => ({
    getBookByISBN: build.query<Book | null, string>({
      query: (isbn) => `volumes?q=isbn:${isbn}&key=${apiKey}`,
      transformResponse: (response: any, _, isbn): Book | null => {
        if (!response.items?.length) return null;
        const volumeInfo = response.items[0].volumeInfo;
        return {
          isbn: parseInt(isbn),
          title: volumeInfo.title,
          author: volumeInfo.authors?.join(', '),
          pages: volumeInfo.pageCount || null,
          coverURL: null,
        };
      },
    }),
  }),
});

export default bookAPI;
export const { useGetBookByISBNQuery } = bookAPI;
