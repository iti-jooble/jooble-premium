import { apiSlice } from "./apiSlice";
import {
  ICVBuilderInitResponse,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

// Define types for the new endpoints
interface IUpdateCvRequest {
  id: string;
  json: any;  // CV data model
  html: string;
  css: string;
}

interface IUpdateCvResponse {
  success: boolean;
  message?: string;
}

interface IDeleteCvRequest {
  id: string;
}

interface IDeleteCvResponse {
  success: boolean;
  message?: string;
}

interface IDuplicateCvRequest {
  id: string;
  newTitle?: string;
}

interface IDuplicateCvResponse {
  success: boolean;
  cv?: any;  // The duplicated CV
  message?: string;
}

export const cvBuilderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize CV builder
    initCvBuilder: builder.mutation<ICVBuilderInitResponse, void>({
      query: () => ({
        url: "/premium-app/cvbuilder/init",
        method: "POST",
      }),
      invalidatesTags: ["CVBuilder"],
    }),

    // Create a CV
    createCv: builder.mutation<ICreateCvResponse, ICreateCvRequest>({
      query: (data) => ({
        url: "/premium-app/cvbuilder/cv/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CVBuilder", "CV"],
    }),

    // Update an existing CV
    updateCv: builder.mutation<IUpdateCvResponse, IUpdateCvRequest>({
      query: (data) => ({
        url: "/premium-app/cvbuilder/cv/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CVBuilder", "CV"],
    }),

    // Delete a CV
    deleteCv: builder.mutation<IDeleteCvResponse, IDeleteCvRequest>({
      query: (data) => ({
        url: "/premium-app/cvbuilder/cv/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["CVBuilder", "CV"],
    }),

    // Duplicate a CV
    duplicateCv: builder.mutation<IDuplicateCvResponse, IDuplicateCvRequest>({
      query: (data) => ({
        url: "/premium-app/cvbuilder/cv/duplicate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CVBuilder", "CV"],
    }),

    // Get AI suggestions for CV content
    getAiSuggestion: builder.mutation<IAISuggestResponse, IPromptConfigApi>({
      query: (data) => ({
        url: "/cvbuilder/suggestv2",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useInitCvBuilderMutation,
  useCreateCvMutation,
  useUpdateCvMutation,
  useDeleteCvMutation,
  useDuplicateCvMutation,
  useGetAiSuggestionMutation,
} = cvBuilderApiSlice;
