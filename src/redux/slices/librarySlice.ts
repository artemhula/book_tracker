import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Book } from '../../types/Book';
import type { RootState } from '../store';
import { supabase } from '../../supabaseClient';

type LibraryState = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

const initialState: LibraryState = {
  books: [],
  loading: false,
  error: null,
};

const getUserId = (state: RootState): string => {
  const userId = state.auth.session?.user.id;
  if (!userId) throw new Error('No user');
  return userId;
};

export const fetchBooks = createAsyncThunk(
  'library/fetchBooks',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data as Book[];
  }
);

export const addBook = createAsyncThunk(
  'library/addBook',
  async (book: Book, { dispatch }) => {
    const { error } = await supabase.from('books').insert([book]);
    if (error) throw error;
    await dispatch(fetchBooks());
  }
);

export const changeTotalPages = createAsyncThunk(
  'library/changeTotalPages',
  async (
    { isbn, totalPages }: { isbn: string; totalPages: number },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    const { error } = await supabase
      .from('books')
      .update({ totalPages })
      .eq('isbn', isbn)
      .eq('user_id', userId);

    if (error) throw error;
    await dispatch(fetchBooks());
  }
);

export const changeCurrentPage = createAsyncThunk(
  'library/changeCurrentPage',
  async (
    { isbn, currentPage }: { isbn: string; currentPage: number },
    { dispatch, getState }
  ) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    const { error } = await supabase
      .from('books')
      .update({ currentPage })
      .eq('isbn', isbn)
      .eq('user_id', userId);

    if (error) throw error;
    await dispatch(fetchBooks());
  }
);

export const deleteBook = createAsyncThunk(
  'library/deleteBook',
  async (isbn: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const userId = getUserId(state);

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('isbn', isbn)
      .eq('user_id', userId);

    if (error) throw error;
    await dispatch(fetchBooks());
  }
);

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error loading books';
      });
  },
});

export const selectBooks = (state: RootState) => state.library.books;
export const selectBookByISBN = (state: RootState, isbn: string | null) =>
  state.library.books.find((b) => b.isbn === isbn);

export default librarySlice.reducer;
