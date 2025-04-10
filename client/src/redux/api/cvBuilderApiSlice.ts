import { apiSlice } from './apiSlice';
import { 
  ICVBuilderInitResponse,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
  ICVBuilderStatisticsData
} from '../../types/api/cvBuilder.types';

export const cvBuilderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize CV builder
    initCvBuilder: builder.query<ICVBuilderInitResponse, void>({
      query: () => ({
        url: '/cvbuilder/init',
        method: 'POST',
      }),
    }),

    // Create a CV
    createCv: builder.mutation<ICreateCvResponse, ICreateCvRequest>({
      query: (data) => ({
        url: '/cvbuilder/createV2',
        method: 'POST',
        body: data,
      }),
    }),

    // Get AI suggestions for CV content
    getAiSuggestion: builder.mutation<IAISuggestResponse, IPromptConfigApi>({
      query: (data) => ({
        url: '/cvbuilder/suggestv2',
        method: 'POST',
        body: data,
      }),
    }),

    // Save CV builder statistics
    saveCvStatistics: builder.mutation<void, ICVBuilderStatisticsData>({
      query: (data) => ({
        url: '/cvbuilder/SaveStatisticAction',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useInitCvBuilderQuery,
  useCreateCvMutation,
  useGetAiSuggestionMutation,
  useSaveCvStatisticsMutation
} = cvBuilderApiSlice;