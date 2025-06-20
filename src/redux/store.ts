import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authSlice from "./features/auth/authSlice";
import { uploadApi } from "./features/upload/uploadApi";
import uploadSlice from "./features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    // authApi reducer to the store
    [authApi.reducerPath]: authApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,

    // other reducers here if needed
    auth: authSlice,
    upload: uploadSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(uploadApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
