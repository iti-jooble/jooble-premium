import type { CV } from "@shared/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  ICreateCvRequest,
  IUpdateCvRequest,
} from "@/types/api/cvBuilder.types";
import { User } from "@/types/state/user.types";

/**
 * API slice for CV-related operations
 */
export const cvApiSlice = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["CvBuilder", "CV"],
  endpoints: (builder) => ({
    // Get all CVs
    getCVs: builder.query<{ cvList: CV[] }, void>({
      query: () => "/cvs",
      providesTags: [{ type: "CV", id: "LIST" }],
    }),

    // Get a single CV by ID
    getCVById: builder.query<CV, number>({
      query: (id) => `/cvs/${id}`,
      providesTags: (result, error, id) => [{ type: "CV", id }],
    }),

    // Create a new CV
    createCV: builder.mutation<{ cvId: number }, ICreateCvRequest>({
      query: (data) => ({
        url: "/cvs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CV", id: "LIST" }],
    }),

    // Update a CV
    updateCV: builder.mutation<{ cvId: number }, IUpdateCvRequest>({
      query: (data) => ({
        url: `/cvs/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CV", id },
        { type: "CV", id: "LIST" },
      ],
    }),

    // Delete a CV
    deleteCV: builder.mutation<void, number>({
      query: (id) => ({
        url: `/cvs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CV", id },
        { type: "CV", id: "LIST" },
      ],
    }),

    // Duplicate a CV
    duplicateCV: builder.mutation<{ cvId: number }, number>({
      query: (id) => ({
        url: `/cvs/${id}/duplicate`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "CV", id: "LIST" }],
    }),

    // Get AI suggestions
    getAISuggestion: builder.mutation<
      { suggestion: string },
      { section: string; additionalContext?: string }
    >({
      query: (data) => ({
        url: "/ai-suggestions",
        method: "POST",
        body: data,
      }),
    }),

    // Parse CV from file
    parseCV: builder.mutation<
      { preferences: User["preferences"]; cv: CV },
      FormData
    >({
      query: (data) => ({
        url: "/cvs/parse",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CV", id: "LIST" }],
    }),
  }),
});
