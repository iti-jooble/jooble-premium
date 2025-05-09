import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/types/state/user.types";

/**
 * API slice for job-related operations
 */
export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<{}, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    updatePreferences: builder.query<void, User["preferences"]>({
      query: (body) => ({
        url: "/user/preferences",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdatePreferencesQuery } = userApiSlice;
