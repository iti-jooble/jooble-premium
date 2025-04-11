import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Base API slice for all API endpoints
 * This serves as the foundation for all feature-specific API slices
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    // Credentials include ensures cookies are sent for authentication
    credentials: "include",
  }),
  tagTypes: ["CvBuilder", "CV", "Job", "User", "Settings"],
  endpoints: () => ({}),
});
