import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserState } from "@/types/state/user.types";
import { BootstrapConfigs } from "@/types/state/bootstrap.types";

export const bootstrapApiSlice = createApi({
  reducerPath: "bootstrapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include",
  }),
  tagTypes: ["Bootstrap"],
  endpoints: (builder) => ({
    init: builder.mutation<
      {
        user: UserState;
        configs: BootstrapConfigs;
      },
      void
    >({
      query: () => ({
        url: "/init",
        method: "POST",
      }),
    }),
  }),
});

export const { useInitMutation } = bootstrapApiSlice;
