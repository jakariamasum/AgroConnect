/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "imageUploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/upload",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ImageUpload"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (file) => ({
        url: "/",
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
