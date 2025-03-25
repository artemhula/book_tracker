import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Book } from '../../models/Book';
import type { RootState } from '../store';
import { apiFetch } from '../../utils/api-fetch';

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

export const fetchBooks = createAsyncThunk(
  'library/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/me/books`);
      if (!res.ok) throw new Error('Cannot fetch books');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addBook = createAsyncThunk(
  'library/addBook',
  async (book: Book, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/book`, {
        method: 'POST',
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error('Failed to add new book ');
      await dispatch(fetchBooks());
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changeTotalPages = createAsyncThunk(
  'library/changeTotalPages',
  async (
    { id, totalPages }: { id: string; totalPages: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/book/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ totalPages }),
      });
      if (!res.ok) throw new Error('Failed to change total pages');
      await dispatch(fetchBooks());
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changeCurrentPage = createAsyncThunk(
  'library/changeCurrentPage',
  async (
    { id, currentPage }: { id: string; currentPage: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/book/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ currentPage }),
      });
      if (!res.ok) throw new Error('Failed to change current page');
      await dispatch(fetchBooks());
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteBook = createAsyncThunk(
  'library/deleteBook',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/book/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete this book');
      await dispatch(fetchBooks());
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
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
