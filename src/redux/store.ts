import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // authApi reducer to the store
    [authApi.reducerPath]: authApi.reducer,

    // other reducers here if needed
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
