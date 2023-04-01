import {configureStore} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Import your root reducer and any other middleware, enhancers, etc.
import favouriteReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, favouriteReducer);

export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);