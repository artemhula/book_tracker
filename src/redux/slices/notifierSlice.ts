import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type NotifierState = {
  type: 'Success' | 'Error' | 'Warning' | null;
  text: string;
};

const initialState: NotifierState = {
  type: null,
  text: '',
};

const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    setNotification(_, action: PayloadAction<NotifierState>) {
      return action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { setNotification, reset } = notifierSlice.actions;
export default notifierSlice.reducer;

export const selectNotification = (state: RootState) => state.notifier;
