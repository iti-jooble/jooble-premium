import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Job } from "@shared/schema";
import { SearchJobsResponse } from "@/types/api/job.types";

/**
 * API slice for job-related operations
 */
export const jobApiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    // Search for jobs with filters
    searchJobs: builder.query<
      SearchJobsResponse,
      { page: { number: number; size: number } }
    >({
      query: (body) => ({
        url: "/jobs/search",
        method: "POST",
        body,
      }),
      providesTags: ["Job"],
    }),

    // Get a single job by ID
    getJobByUid: builder.query<Job, string>({
      query: (uid) => `/jobs/${uid}`,
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),
  }),
});

export const { useSearchJobsQuery, useGetJobByUidQuery } = jobApiSlice;
