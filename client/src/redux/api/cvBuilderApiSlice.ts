import { apiSlice } from './apiSlice';
import { CV } from '@shared/schema';
import { 
  ICreateCvRequest, 
  ICreateCvResponse,
  IUpdateCvRequest, 
  IUpdateCvResponse,
  IDeleteCvRequest, 
  IDeleteCvResponse,
  IDuplicateCvRequest, 
  IDuplicateCvResponse,
  IPromptConfigApi,
  IAiSuggestionResponse
} from '../../types/api/cvBuilder.types';

// Define an interface for the initCvBuilder response
interface ICVBuilderInitResponse {
  cvList: CV[];
}

/**
 * CV Builder API slice
 * Extends the base API slice with endpoints specific to CV building
 */
export const cvBuilderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all CVs for the current user
    initCvBuilder: builder.query<ICVBuilderInitResponse, void>({
      query: () => 'cv',
      providesTags: [{ type: 'CV' }],
    }),

    // Create a new CV
    createCv: builder.mutation<ICreateCvResponse, ICreateCvRequest>({
      query: (data) => ({
        url: 'cv/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'CV' }],
    }),

    // Update an existing CV
    updateCv: builder.mutation<IUpdateCvResponse, IUpdateCvRequest>({
      query: (data) => ({
        url: 'cv/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'CV' }],
    }),

    // Delete a CV
    deleteCv: builder.mutation<IDeleteCvResponse, IDeleteCvRequest>({
      query: (data) => ({
        url: 'cv/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: [{ type: 'CV' }],
    }),

    // Duplicate a CV
    duplicateCv: builder.mutation<IDuplicateCvResponse, IDuplicateCvRequest>({
      query: (data) => ({
        url: 'cv/duplicate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'CV' }],
    }),

    // Get AI suggestions for CV content
    getAiSuggestion: builder.mutation<IAiSuggestionResponse, IPromptConfigApi>({
      query: (data) => ({
        url: 'cv/ai-suggestion',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});