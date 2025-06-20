/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "@/types/auth.types";
import { ApiResponse } from "@/types/response.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "FARMER" | "BUYER";
}

interface LoginResponse {
  user: TUser;
  token: string;
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse<LoginResponse>, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<
      ApiResponse<{ token: string }>,
      { refreshToken: string }
    >({
      query: ({ refreshToken }) => ({
        url: "/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    getProfile: builder.query<ApiResponse<TUser>, void>({
      query: () => "/profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<ApiResponse<TUser>, Partial<TUser>>({
      query: (updates) => ({
        url: "/profile",
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<
      ApiResponse<null>,
      { currentPassword: string; newPassword: string }
    >({
      query: (passwords) => ({
        url: "/change-password",
        method: "POST",
        body: passwords,
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<null>, { email: string }>({
      query: ({ email }) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      ApiResponse<null>,
      { token: string; password: string }
    >({
      query: ({ token, password }) => ({
        url: "/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
    verifyEmail: builder.mutation<ApiResponse<null>, { token: string }>({
      query: ({ token }) => ({
        url: "/verify-email",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} = authApi;
