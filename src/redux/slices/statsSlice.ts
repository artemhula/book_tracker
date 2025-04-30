import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { apiFetch } from '../../utils/api-fetch';
import type { StatisticReport } from '../../models/StatisticReport';
import type { RootState } from '../store';

interface StatsState {
  data: StatisticReport | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchStats = createAsyncThunk(
  'stats/fetchStats',
  async (bookId: string | undefined, { rejectWithValue }) => {
    try {
      const url = bookId
        ? `${import.meta.env.VITE_API_URL}/stats/report/${bookId}`
        : `${import.meta.env.VITE_API_URL}/stats/report/`;

      const res = await apiFetch(url);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearStats: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStats.fulfilled,
        (state, action: PayloadAction<StatisticReport>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStats } = statsSlice.actions;
export default statsSlice.reducer;

export const selectStats = (state: RootState) => state.stats.data;
export const selectStatsLoading = (state: RootState) => state.stats.loading;
export const selectStatsError = (state: RootState) => state.stats.error;
