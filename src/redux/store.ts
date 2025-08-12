import { combineReducers, configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
import modalReducer from './slices/modalSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookAPI from '../api/BookService';
import coverAPI from '../api/CoverService';

const libraryPersistConfig = {
  key: 'library',
  storage,
};

const rootReducer = combineReducers({
  library: persistReducer(libraryPersistConfig, libraryReducer),
  modal: modalReducer,
  [bookAPI.reducerPath]: bookAPI.reducer,
  [coverAPI.reducerPath]: coverAPI.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bookAPI.middleware, coverAPI.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
