import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(_, action: PayloadAction<string>) {
      return action.payload;
    },
    resetError() {
      return '';
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
