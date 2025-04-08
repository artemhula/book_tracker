import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../../types/Book';
import type { RootState } from '../store';

const initialState: Book[] = [];

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.push(action.payload);
    },
  },
});

export const { addBook } = librarySlice.actions;

export const selectBooks = (state: RootState) => state.library;
export default librarySlice.reducer;
