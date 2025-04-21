import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../supabaseClient';
import type { RootState } from '../store';

type AuthState = {
  session: Session | null;
};

const initialState: AuthState = {
  session: null,
};

export const fetchSession = createAsyncThunk('auth/fetchSession', async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
    throw error;
  }
  return data.session as Session | null;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw error;
  }
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.session = action.payload;
      })
      .addCase(signOut.fulfilled, () => {
        return initialState;
      });
  },
});

export const { setSession } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.session?.user;
export default authSlice.reducer;
