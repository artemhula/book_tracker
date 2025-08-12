import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types/Book';
import type { RootState } from '../store';

const initialState: { books: Book[] } = {
  books: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    changeTotalPages(
      state,
      action: PayloadAction<{ isbn: number; pages: number }>
    ) {
      const { isbn, pages } = action.payload;
      console.log(action.payload);
      const book = state.books.find((b) => b.isbn === isbn);
      if (book) {
        book.totalPages = pages;
      }
      console.log('ok');
    },
  },
});

export const { addBook, changeTotalPages } = librarySlice.actions;

export const selectBooks = (state: RootState) => state.library.books;
export const selectBookByISBN = (isbn: number | null) => (state: RootState) => {
  if (isbn) return state.library.books.find((b) => b.isbn === isbn);
  return null;
};
export default librarySlice.reducer;
