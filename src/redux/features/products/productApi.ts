/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/generated/prisma";
import { ApiResponse } from "@/types/response.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UpdateProductRequest extends Partial<Product> {
  id: string;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/products",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product>, ProductFilters>({
      query: (filters = {}) => ({
        url: "",
        params: filters,
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getProductHierarchy: builder.query<ApiResponse<Product[]>, void>({
      query: () => "/hierarchy",
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, Product>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, UpdateProductRequest>(
      {
        query: ({ id, ...data }) => ({
          url: `/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "Product", id },
          "Product",
        ],
      }
    ),
    deleteProduct: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    reorderProducts: builder.mutation<
      ApiResponse<void>,
      { ProductIds: string[] }
    >({
      query: (data) => ({
        url: "/reorder",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductHierarchyQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReorderProductsMutation,
} = productsApi;
