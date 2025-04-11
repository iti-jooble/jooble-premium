import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// CoverLetter interface
interface CoverLetter {
  id: string;
  title: string;
  content: string;
  cvId?: string;
  jobId?: string;
  dateCreated: string;
  lastModified?: string;
}

// CoverLetter template interface
interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
}

/**
 * API slice for cover letter operations
 */
export const coverLetterApi = createApi({
  reducerPath: 'coverLetterApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['CoverLetter', 'Template'],
  endpoints: (builder) => ({
    // Get all cover letters
    getCoverLetters: builder.query<CoverLetter[], void>({
      query: () => '/cover-letters',
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'CoverLetter' as const, id })),
              { type: 'CoverLetter', id: 'LIST' }
            ]
          : [{ type: 'CoverLetter', id: 'LIST' }]
    }),
    
    // Get a single cover letter by ID
    getCoverLetterById: builder.query<CoverLetter, string>({
      query: (id) => `/cover-letters/${id}`,
      providesTags: (result, error, id) => [{ type: 'CoverLetter', id }]
    }),
    
    // Create a new cover letter
    createCoverLetter: builder.mutation<CoverLetter, Omit<CoverLetter, 'id' | 'dateCreated'>>({
      query: (data) => ({
        url: '/cover-letters',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'CoverLetter', id: 'LIST' }]
    }),
    
    // Update a cover letter
    updateCoverLetter: builder.mutation<CoverLetter, { id: string, data: Partial<CoverLetter> }>({
      query: ({ id, data }) => ({
        url: `/cover-letters/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'CoverLetter', id },
        { type: 'CoverLetter', id: 'LIST' }
      ]
    }),
    
    // Delete a cover letter
    deleteCoverLetter: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cover-letters/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'CoverLetter', id },
        { type: 'CoverLetter', id: 'LIST' }
      ]
    }),
    
    // Generate a cover letter using AI
    generateCoverLetter: builder.mutation<{ content: string }, { cvId: string, jobId?: string, customPrompt?: string }>({
      query: (data) => ({
        url: '/cover-letters/generate',
        method: 'POST',
        body: data
      })
    }),
    
    // Get cover letter templates
    getTemplates: builder.query<CoverLetterTemplate[], void>({
      query: () => '/cover-letters/templates',
      providesTags: ['Template']
    }),
    
    // Apply a template to a cover letter
    applyTemplate: builder.mutation<CoverLetter, { coverId: string, templateId: string }>({
      query: ({ coverId, templateId }) => ({
        url: `/cover-letters/${coverId}/apply-template`,
        method: 'POST',
        body: { templateId }
      }),
      invalidatesTags: (result, error, { coverId }) => [
        { type: 'CoverLetter', id: coverId }
      ]
    })
  })
});

// Export hooks for use in components
export const {
  useGetCoverLettersQuery,
  useGetCoverLetterByIdQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
  useGenerateCoverLetterMutation,
  useGetTemplatesQuery,
  useApplyTemplateMutation
} = coverLetterApi;