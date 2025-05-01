import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConfig } from "../../types/state/config.types";

export const configApiSlice = createApi({
  reducerPath: "configApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Config"],
  endpoints: (builder) => ({
    // Get all configs
    getConfigs: builder.query<IConfig, void>({
      query: () => ({
        url: "/init",
        method: "POST",
      }),
      providesTags: ["Config"],
      transformResponse: (response: any) => {
        // Update userInfo in the store
        if (response.userInfo) {
          // Dispatch the action to update userInfo
          configApiSlice.util.updateQueryData(
            "getConfigs",
            undefined,
            (draft) => {
              return {
                ...draft,
                userInfo: response.userInfo,
              };
            },
          );
        }
        return response;
      },
    }),
  }),
});

export const { useGetConfigsQuery } = configApiSlice;
