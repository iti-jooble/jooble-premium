import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CV, PersonalInfo, Education, Skill, WorkExperience } from '../../../shared/schema';

// Define types for our API endpoints
interface GetCVsResponse {
  cvs: CV[];
  total: number;
}

interface GetCVResponse {
  cv: CV;
}

interface CreateCVRequest {
  title: string;
  personalInfo?: Partial<PersonalInfo>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  workExperience?: WorkExperience[];
}

interface UpdateCVRequest {
  id: string;
  title?: string;
  personalInfo?: Partial<PersonalInfo>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  workExperience?: WorkExperience[];
}

interface DeleteCVResponse {
  success: boolean;
  id: string;
}

// Define our CV API
export const cvApi = createApi({
  reducerPath: 'cvApi',
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
  tagTypes: ['CV'],
  endpoints: (builder) => ({
    // Get all CVs for the current user
    getCVs: builder.query<GetCVsResponse, void>({
      query: () => '/cvs',
      providesTags: (result) => 
        result
          ? [
              ...result.cvs.map(({ id }) => ({ type: 'CV' as const, id })),
              { type: 'CV' as const, id: 'LIST' },
            ]
          : [{ type: 'CV' as const, id: 'LIST' }],
    }),
    
    // Get a single CV by ID
    getCVById: builder.query<CV, string>({
      query: (id) => `/cvs/${id}`,
      providesTags: (result, error, id) => [{ type: 'CV' as const, id }],
    }),
    
    // Create a new CV
    createCV: builder.mutation<CV, CreateCVRequest>({
      query: (cv) => ({
        url: '/cvs',
        method: 'POST',
        body: cv,
      }),
      invalidatesTags: [{ type: 'CV', id: 'LIST' }],
    }),
    
    // Update an existing CV
    updateCV: builder.mutation<CV, UpdateCVRequest>({
      query: ({ id, ...updates }) => ({
        url: `/cvs/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'CV', id }],
    }),
    
    // Delete a CV
    deleteCV: builder.mutation<DeleteCVResponse, string>({
      query: (id) => ({
        url: `/cvs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'CV', id },
        { type: 'CV', id: 'LIST' },
      ],
    }),
    
    // Generate CV
    generateCV: builder.mutation<CV, { jobDescription: string }>({
      query: (body) => ({
        url: '/cvs/generate',
        method: 'POST',
        body,
      }),
    }),
    
    // Grade CV against job description
    gradeCV: builder.mutation<{ score: number; feedback: string }, { cvId: string; jobDescription: string }>({
      query: (body) => ({
        url: '/cvs/grade',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetCVsQuery,
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVMutation,
  useDeleteCVMutation,
  useGenerateCVMutation,
  useGradeCVMutation,
} = cvApi;