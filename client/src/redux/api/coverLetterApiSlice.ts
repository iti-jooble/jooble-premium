import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define types for cover letter operations
interface CoverLetter {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  lastModified: string;
  jobId?: string;
  cvId?: string;
}

interface CoverLetterListResponse {
  coverLetters: CoverLetter[];
  total: number;
}

interface CreateCoverLetterRequest {
  title: string;
  content?: string;
  jobId?: string;
  cvId?: string;
}

interface UpdateCoverLetterRequest {
  id: string;
  title?: string;
  content?: string;
}

interface GenerateCoverLetterRequest {
  cvId: string;
  jobId?: string;
  jobDescription?: string;
  companyName?: string;
  additionalInfo?: string;
}

// Define our Cover Letter API
export const coverLetterApi = createApi({
  reducerPath: 'coverLetterApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
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
  tagTypes: ['CoverLetter'],
  endpoints: (builder) => ({
    // Get all cover letters
    getCoverLetters: builder.query<CoverLetterListResponse, void>({
      query: () => '/cover-letters',
      providesTags: (result) => 
        result
          ? [
              ...result.coverLetters.map(({ id }) => ({ type: 'CoverLetter' as const, id })),
              { type: 'CoverLetter' as const, id: 'LIST' },
            ]
          : [{ type: 'CoverLetter' as const, id: 'LIST' }],
    }),
    
    // Get a single cover letter by ID
    getCoverLetterById: builder.query<CoverLetter, string>({
      query: (id) => `/cover-letters/${id}`,
      providesTags: (result, error, id) => [{ type: 'CoverLetter' as const, id }],
    }),
    
    // Create a new cover letter
    createCoverLetter: builder.mutation<CoverLetter, CreateCoverLetterRequest>({
      query: (coverLetter) => ({
        url: '/cover-letters',
        method: 'POST',
        body: coverLetter,
      }),
      invalidatesTags: [{ type: 'CoverLetter', id: 'LIST' }],
    }),
    
    // Update an existing cover letter
    updateCoverLetter: builder.mutation<CoverLetter, UpdateCoverLetterRequest>({
      query: ({ id, ...updates }) => ({
        url: `/cover-letters/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CoverLetter', id }],
    }),
    
    // Delete a cover letter
    deleteCoverLetter: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/cover-letters/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'CoverLetter', id },
        { type: 'CoverLetter', id: 'LIST' },
      ],
    }),
    
    // Generate a cover letter with AI
    generateCoverLetter: builder.mutation<CoverLetter, GenerateCoverLetterRequest>({
      query: (request) => ({
        url: '/cover-letters/generate',
        method: 'POST',
        body: request,
      }),
    }),
    
    // Improve an existing cover letter with AI
    improveCoverLetter: builder.mutation<CoverLetter, { id: string; suggestions?: string }>({
      query: ({ id, ...body }) => ({
        url: `/cover-letters/${id}/improve`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CoverLetter', id }],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetCoverLettersQuery,
  useGetCoverLetterByIdQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
  useGenerateCoverLetterMutation,
  useImproveCoverLetterMutation,
} = coverLetterApi;