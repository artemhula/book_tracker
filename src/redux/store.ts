import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
import bookAPI from '../api/BookService';
import coverAPI from '../api/CoverService';

const store = configureStore({
  reducer: {
    library: libraryReducer,
    [bookAPI.reducerPath]: bookAPI.reducer,
    [coverAPI.reducerPath]: coverAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookAPI.middleware, coverAPI.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
