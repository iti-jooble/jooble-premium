import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Import feature-specific API slices
import { cvApi } from './cvApiSlice';
import { jobApi } from './jobApiSlice';
import { authApi } from './authApiSlice';
import { coverLetterApi } from './coverLetterApiSlice';

// Create our base API slice for RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    // Prepare headers for authenticated requests
    prepareHeaders: (headers, { getState }) => {
      // If we have a token, add it to the headers
      const token = (getState() as any).user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Define tag types for cache invalidation
  tagTypes: ['CV', 'Job', 'User', 'CoverLetter', 'SavedJob'],
  // Base endpoints that don't fit into other slices
  endpoints: () => ({}),
});

// Export all API slices for use in store and components
export {
  cvApi,
  jobApi,
  authApi,
  coverLetterApi
};