import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  ResetPasswordRequest,
  ResetPasswordConfirmRequest
} from '../../types/api/auth.types';

// Define our Auth API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the user state
      const token = (getState() as any).user?.token;
      
      // If we have a token, include it in the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Register a new user
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Login a user
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Logout a user
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    
    // Get current user profile
    getMe: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
    
    // Update user profile
    updateProfile: builder.mutation<User, UpdateProfileRequest>({
      query: (updates) => ({
        url: '/profile',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Change password
    changePassword: builder.mutation<{ success: boolean }, ChangePasswordRequest>({
      query: (passwords) => ({
        url: '/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),
    
    // Request password reset
    requestPasswordReset: builder.mutation<{ success: boolean }, ResetPasswordRequest>({
      query: (body) => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
    
    // Confirm password reset
    confirmPasswordReset: builder.mutation<{ success: boolean }, ResetPasswordConfirmRequest>({
      query: (body) => ({
        url: '/reset-password-confirm',
        method: 'POST',
        body,
      }),
    }),
    
    // Get premium status
    getPremiumStatus: builder.query<{ isPremium: boolean }, void>({
      query: () => '/premium-status',
      providesTags: ['User'],
    }),
    
    // Upgrade to premium
    upgradeToPremium: builder.mutation<{ success: boolean; isPremium: boolean }, void>({
      query: () => ({
        url: '/upgrade-premium',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for use in components
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRequestPasswordResetMutation,
  useConfirmPasswordResetMutation,
  useGetPremiumStatusQuery,
  useUpgradeToPremiumMutation,
} = authApi;