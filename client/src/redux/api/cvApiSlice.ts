import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CV } from '@shared/schema';

/**
 * API slice for CV-related operations
 */
export const cvApi = createApi({
  reducerPath: 'cvApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['CV', 'CVContent'],
  endpoints: (builder) => ({
    // Get all CVs
    getCVs: builder.query<CV[], void>({
      query: () => '/cvs',
      providesTags: (result) => 
        result 
          ? [
              ...result.map(({ id }) => ({ type: 'CV' as const, id })),
              { type: 'CV', id: 'LIST' }
            ]
          : [{ type: 'CV', id: 'LIST' }]
    }),
    
    // Get a single CV by ID
    getCVById: builder.query<CV, string>({
      query: (id) => `/cvs/${id}`,
      providesTags: (result, error, id) => [{ type: 'CV', id }]
    }),
    
    // Create a new CV
    createCV: builder.mutation<CV, Omit<CV, 'id' | 'dateCreated'>>({
      query: (data) => ({
        url: '/cvs',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'CV', id: 'LIST' }]
    }),
    
    // Update a CV
    updateCV: builder.mutation<CV, { id: string, data: Partial<CV> }>({
      query: ({ id, data }) => ({
        url: `/cvs/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'CV', id },
        { type: 'CV', id: 'LIST' }
      ]
    }),
    
    // Delete a CV
    deleteCV: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cvs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'CV', id },
        { type: 'CV', id: 'LIST' },
        { type: 'CVContent', id }
      ]
    }),
    
    // Duplicate a CV
    duplicateCV: builder.mutation<CV, { id: string, title?: string }>({
      query: ({ id, title }) => ({
        url: `/cvs/${id}/duplicate`,
        method: 'POST',
        body: { title }
      }),
      invalidatesTags: [{ type: 'CV', id: 'LIST' }]
    }),
    
    // Get CV content
    getCVContent: builder.query<any, string>({
      query: (id) => `/cvs/${id}/content`,
      providesTags: (result, error, id) => [{ type: 'CVContent', id }]
    }),
    
    // Update a section of CV content
    updateCVContent: builder.mutation<any, { id: string, section: string, data: any }>({
      query: ({ id, section, data }) => ({
        url: `/cvs/${id}/content/${section}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'CVContent', id },
        { type: 'CV', id }
      ]
    }),
    
    // Get AI suggestions
    getAISuggestion: builder.mutation<{ suggestion: string }, { section: string, additionalContext?: string }>({
      query: (data) => ({
        url: '/ai-suggestions',
        method: 'POST',
        body: data
      })
    })
  })
});

// Export hooks for use in components
export const {
  useGetCVsQuery,
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVMutation,
  useDeleteCVMutation,
  useDuplicateCVMutation,
  useGetCVContentQuery,
  useUpdateCVContentMutation,
  useGetAISuggestionMutation
} = cvApi;