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
      action: PayloadAction<{ isbn: number; totalPages: number }>
    ) {
      const { isbn, totalPages: pages } = action.payload;
      console.log(action.payload);
      const book = state.books.find((b) => b.isbn === isbn);
      if (book) {
        book.totalPages = pages;
      }
    },
    changeCurrentPage(
      state,
      action: PayloadAction<{ isbn: number; currectPage: number }>
    ) {
      const { isbn, currectPage } = action.payload;
      console.log(action.payload);
      const book = state.books.find((b) => b.isbn === isbn);
      if (book) {
        book.currentPage = currectPage;
      }
    },
  },
});

export const { addBook, changeTotalPages, changeCurrentPage } =
  librarySlice.actions;

export const selectBooks = (state: RootState) => state.library.books;
export const selectBookByISBN = (isbn: number | null) => (state: RootState) => {
  if (isbn) return state.library.books.find((b) => b.isbn === isbn);
  return null;
};
export default librarySlice.reducer;
