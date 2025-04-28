import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { RootState } from '../store';
import { apiFetch } from '../../utils/api-fetch';

const initialState = {
  user: null,
  loading: false,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/me`);
      if (!res.ok) throw new Error('Failed to fetch user');
      return (await res.json()) as User;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiFetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: 'POST',
        }
      );
      if (!res.ok) throw new Error('Failed to logout');
      localStorage.removeItem('accessToken');
      return await res.json;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = true;
      });
  },
});

export const selectUser = (state: RootState): User | null => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
