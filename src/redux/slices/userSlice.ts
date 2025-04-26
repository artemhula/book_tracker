import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { RootState } from '../store';
import { apiFetch } from '../../utils/api-fetch';

const initialState: User | null = null;

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUser.fulfilled,
        (_, action: PayloadAction<User>) => action.payload as User
      )
      .addCase(fetchUser.rejected, () => null);
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
