import { apiSlice } from "./apiSlice";
import {
  ICVBuilderInitResponse,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

export const cvBuilderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize CV builder
    initCvBuilder: builder.mutation<ICVBuilderInitResponse, void>({
      query: () => ({
        url: "/cvbuilder/init",
        method: "POST",
      }),
      // Cache validation - invalidates CVBuilder cache tag
      invalidatesTags: ['CVBuilder'],
    }),

    // Create a CV
    createCv: builder.mutation<ICreateCvResponse, ICreateCvRequest>({
      query: (data) => ({
        url: "/cvbuilder/create",
        method: "POST",
        body: data,
      }),
      // Cache validation - invalidates both CV and CVBuilder cache tags
      invalidatesTags: ['CV', 'CVBuilder'],
    }),

    // Get AI suggestions for CV content
    getAiSuggestion: builder.mutation<
      {type: string; content: string}, 
      {
        type: string;
        userContent: string;
        systemReplacements?: Record<string, string>;
      }
    >({
      query: (payload) => {
        // Convert our payload format to the API's expected format
        const promptConfig: IPromptConfigApi = {
          type: payload.type,
          userReplacements: {
            content: payload.userContent,
          },
          systemReplacements: payload.systemReplacements || {},
        };
        
        return {
          url: "/cvbuilder/suggest",
          method: "POST",
          body: promptConfig,
        };
      },
      // Transform the response
      transformResponse: (response: IAISuggestResponse, _, arg) => {
        return {
          type: arg.type,
          content: response.content,
        };
      },
    }),
  }),
});

export const {
  useInitCvBuilderMutation,
  useCreateCvMutation,
  useGetAiSuggestionMutation,
} = cvBuilderApiSlice;
