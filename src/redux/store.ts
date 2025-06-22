import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authSlice from "./features/auth/authSlice";
import { uploadApi } from "./features/upload/uploadApi";
import uploadSlice from "./features/upload/uploadSlice";
import { categoriesApi } from "./features/categories/categoriesApi";
import categoriesSlice from "./features/categories/categoriesSlice";
import { productsApi } from "./features/products/productApi";

export const store = configureStore({
  reducer: {
    // authApi reducer to the store
    [authApi.reducerPath]: authApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,

    // other reducers here if needed
    auth: authSlice,
    upload: uploadSlice,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(uploadApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
