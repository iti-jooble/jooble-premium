import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API slice for extending with specific endpoints
 * This provides consistent error handling and other common functionality
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    // Customize error handling if needed
    validateStatus: (response, result) => {
      // Return true (success) or false (error) based on response status
      return response.status >= 200 && response.status < 300;
    }
  }),
  tagTypes: ['Auth', 'User', 'Setting'],
  endpoints: () => ({})
});

/**
 * Helper function to extract error messages from RTK Query responses
 */
export const extractErrorMessage = (error: any): string => {
  // Extract error message from various error formats
  if (typeof error === 'string') return error;
  if (error?.data?.message) return error.data.message;
  if (error?.error) return error.error;
  if (error?.data?.error) return error.data.error;
  if (error?.message) return error.message;
  return 'An unknown error occurred';
};