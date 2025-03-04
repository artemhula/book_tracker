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
  },
});

export const { addBook } = librarySlice.actions;

export const selectBooks = (state: RootState) => state.library.books;
export default librarySlice.reducer;
