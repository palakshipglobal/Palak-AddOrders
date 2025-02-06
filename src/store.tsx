// import { configureStore } from "@reduxjs/toolkit";
// import formReducer from "./features/formSlice";
// export const store = configureStore({
//   reducer: {
//     form: formReducer,
//   },
// });
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from "./features/formSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, formReducer);

export const store = configureStore({
  reducer: {
    form: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;