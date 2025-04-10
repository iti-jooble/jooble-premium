import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Job } from '../../types/state/jobSearch.types';
import { 
  GetJobsResponse,
  GetJobResponse,
  SearchJobsRequest,
  SavedJobResponse,
  MatchCVResponse,
  GenerateJobTipsRequest,
  GenerateJobTipsResponse
} from '../../types/api/job.types';

// Define our Job API
export const jobApi = createApi({
  reducerPath: 'jobApi',
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
  tagTypes: ['Job', 'SavedJob'],
  endpoints: (builder) => ({
    // Search jobs with filters
    searchJobs: builder.query<GetJobsResponse, SearchJobsRequest>({
      query: (params) => ({
        url: '/jobs/search',
        method: 'GET',
        params,
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.jobs.map(({ id }) => ({ type: 'Job' as const, id })),
              { type: 'Job' as const, id: 'LIST' },
            ]
          : [{ type: 'Job' as const, id: 'LIST' }],
    }),
    
    // Get a single job by ID
    getJobById: builder.query<Job, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job' as const, id }],
    }),
    
    // Get recommended jobs based on user's profile or CV
    getRecommendedJobs: builder.query<Job[], { cvId?: string; limit?: number }>({
      query: (params) => ({
        url: '/jobs/recommended',
        method: 'GET',
        params,
      }),
      providesTags: ['Job'],
    }),
    
    // Get saved jobs
    getSavedJobs: builder.query<Job[], void>({
      query: () => '/jobs/saved',
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'SavedJob' as const, id })),
              { type: 'SavedJob' as const, id: 'LIST' },
            ]
          : [{ type: 'SavedJob' as const, id: 'LIST' }],
    }),
    
    // Save a job
    saveJob: builder.mutation<SavedJobResponse, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/save`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'SavedJob', id },
        { type: 'SavedJob', id: 'LIST' },
      ],
    }),
    
    // Unsave a job
    unsaveJob: builder.mutation<SavedJobResponse, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/unsave`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'SavedJob', id },
        { type: 'SavedJob', id: 'LIST' },
      ],
    }),
    
    // Match CV to a job
    matchCV: builder.mutation<MatchCVResponse, { cvId: string; jobId: string }>({
      query: (body) => ({
        url: '/jobs/match',
        method: 'POST',
        body,
      }),
    }),
    
    // Generate job application tips
    generateJobTips: builder.mutation<{ tips: string[] }, { cvId: string; jobId: string }>({
      query: (body) => ({
        url: '/jobs/tips',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useSearchJobsQuery,
  useGetJobByIdQuery,
  useGetRecommendedJobsQuery,
  useGetSavedJobsQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useMatchCVMutation,
  useGenerateJobTipsMutation,
} = jobApi;