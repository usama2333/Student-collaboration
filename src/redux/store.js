// store/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import { createWrapper } from 'next-redux-wrapper';
import sidebarReducer from './features/sidebarSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }),
  });

export const store = makeStore();
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
