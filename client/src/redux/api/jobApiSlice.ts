import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  isNew?: boolean;
}

// Search parameters interface
interface JobSearchParams {
  keywords?: string;
  location?: string;
  type?: string;
  salary?: string;
  page?: number;
  limit?: number;
}

/**
 * API slice for job-related operations
 */
export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    // Search for jobs with filters
    searchJobs: builder.query<Job[], JobSearchParams>({
      query: (params) => ({
        url: '/jobs/search',
        method: 'GET',
        params
      }),
      providesTags: ['Job']
    }),
    
    // Get a single job by ID
    getJobById: builder.query<Job, string>({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job', id }]
    }),
    
    // Get recommended jobs based on CV
    getRecommendedJobs: builder.query<Job[], string>({
      query: (cvId) => `/jobs/recommended/${cvId}`,
      providesTags: ['Job']
    }),
    
    // Save/bookmark a job
    saveJob: builder.mutation<void, { userId: string, jobId: string }>({
      query: ({ userId, jobId }) => ({
        url: `/users/${userId}/saved-jobs`,
        method: 'POST',
        body: { jobId }
      })
    }),
    
    // Remove a saved/bookmarked job
    unsaveJob: builder.mutation<void, { userId: string, jobId: string }>({
      query: ({ userId, jobId }) => ({
        url: `/users/${userId}/saved-jobs/${jobId}`,
        method: 'DELETE'
      })
    }),
    
    // Get saved/bookmarked jobs for a user
    getSavedJobs: builder.query<Job[], string>({
      query: (userId) => `/users/${userId}/saved-jobs`,
      providesTags: ['Job']
    })
  })
});

// Export hooks for use in components
export const {
  useSearchJobsQuery,
  useGetJobByIdQuery,
  useGetRecommendedJobsQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetSavedJobsQuery
} = jobApi;