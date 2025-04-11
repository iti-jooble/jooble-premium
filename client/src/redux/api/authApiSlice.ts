import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// User interfaces for authentication
interface User {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  fullName?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

/**
 * API slice for authentication operations
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    // Include credentials for authentication cookies
    credentials: 'include',
    // Add authorization header if token exists
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ['Auth']
    }),
    
    // Register endpoint
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Auth']
    }),
    
    // Logout endpoint
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      invalidatesTags: ['Auth']
    }),
    
    // Get current user info
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['Auth']
    }),
    
    // Request password reset
    requestPasswordReset: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data
      })
    }),
    
    // Reset password with token
    resetPassword: builder.mutation<{ message: string }, { token: string, password: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data
      })
    })
  })
});

// Export hooks for use in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRequestPasswordResetMutation,
  useResetPasswordMutation
} = authApi;