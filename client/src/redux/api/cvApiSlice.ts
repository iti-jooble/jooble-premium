import type { CV } from "@shared/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

/**
 * API slice for CV-related operations
 */
export const cvApiSlice = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    // Credentials include ensures cookies are sent for authentication
    credentials: "include",
  }),
  tagTypes: ["CvBuilder", "CV"],
  endpoints: (builder) => ({
    // Get all CVs
    getCVs: builder.query<CV[], void>({
      query: () => "/cvs",
      providesTags: [{ type: "CV", id: "LIST" }],
    }),

    // Get a single CV by ID
    getCVById: builder.query<CV, string>({
      query: (id) => `/cvs/${id}`,
      providesTags: (result, error, id) => [{ type: "CV", id }],
    }),

    // Create a new CV
    createCV: builder.mutation<CV, Omit<CV, "id" | "dateCreated">>({
      query: (data) => ({
        url: "/cvs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CV", id: "LIST" }],
    }),

    // Update a CV
    updateCV: builder.mutation<CV, { id: string; data: Partial<CV> }>({
      query: ({ id, data }) => ({
        url: `/cvs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CV", id },
        { type: "CV", id: "LIST" },
      ],
    }),

    // Delete a CV
    deleteCV: builder.mutation<void, string>({
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
    duplicateCV: builder.mutation<CV, { id: string; title?: string }>({
      query: ({ id, title }) => ({
        url: `/cvs/${id}/duplicate`,
        method: "POST",
        body: { title },
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
  }),
});
