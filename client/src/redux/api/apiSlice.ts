import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  tagTypes: ['Cv', 'Job', 'User'],
  // We'll define our endpoints in separate files that extend this slice
  endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {
  // These will be filled automatically as we create endpoints
} = apiSlice;