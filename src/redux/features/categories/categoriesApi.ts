/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/generated/prisma";
import { ApiResponse } from "@/types/response.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

export interface CategoryFilters {
  search?: string;
  parentId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/categories",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category>, CategoryFilters>({
      query: (filters = {}) => ({
        url: "",
        params: filters,
      }),
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    getCategoryHierarchy: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/hierarchy",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      ApiResponse<Category>,
      CreateCategoryRequest
    >({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      ApiResponse<Category>,
      UpdateCategoryRequest
    >({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Category", id },
        "Category",
      ],
    }),
    deleteCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    reorderCategories: builder.mutation<
      ApiResponse<void>,
      { categoryIds: string[] }
    >({
      query: (data) => ({
        url: "/reorder",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    uploadCategoryImage: builder.mutation<
      ApiResponse<{ url: string }>,
      FormData
    >({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryHierarchyQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoriesMutation,
  useUploadCategoryImageMutation,
} = categoriesApi;
