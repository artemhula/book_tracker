import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import libraryReducer from './slices/librarySlice';
import modalReducer from './slices/modalSlice';
import notifierReducer from './slices/notifierSlice';
import statsReducer from './slices/statsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookAPI from '../api/BookService';
import coverAPI from '../api/CoverService';

const userPersistConfig = {
  key: 'user',
  storage,
};

const libraryPersistConfig = {
  key: 'library',
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  library: persistReducer(libraryPersistConfig, libraryReducer),
  modal: modalReducer,
  notifier: notifierReducer,
  stats: statsReducer,
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
