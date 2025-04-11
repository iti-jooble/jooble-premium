import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CV, PersonalInfo, Skill, Education, WorkExperience } from '@shared/schema';

/**
 * API slice for CV Builder operations
 * This is separate from the general CV API slice to handle more specific CV builder interactions
 */
export const cvBuilderApiSlice = createApi({
  reducerPath: 'cvBuilderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['CV', 'CVContent', 'Template', 'Suggestion'],
  endpoints: (builder) => ({
    // Get available CV templates
    getTemplates: builder.query<Array<{ id: number, name: string, description: string, previewUrl: string }>, void>({
      query: () => '/cv-templates',
      providesTags: ['Template']
    }),
    
    // Get AI suggestions for different CV sections
    getAISuggestion: builder.mutation<{ suggestion: string }, { section: string, additionalContext?: string }>({
      query: (data) => ({
        url: '/ai-suggestions',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Suggestion']
    }),
    
    // Update personal info section
    updatePersonalInfo: builder.mutation<{ personalInfo: PersonalInfo }, { cvId: string, data: PersonalInfo }>({
      query: ({ cvId, data }) => ({
        url: `/cvs/${cvId}/content/personalInfo`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CVContent', id: cvId },
        { type: 'CV', id: cvId }
      ]
    }),
    
    // Update skills section
    updateSkills: builder.mutation<{ skills: Skill[] }, { cvId: string, data: Skill[] }>({
      query: ({ cvId, data }) => ({
        url: `/cvs/${cvId}/content/skills`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CVContent', id: cvId },
        { type: 'CV', id: cvId }
      ]
    }),
    
    // Update education section
    updateEducation: builder.mutation<{ education: Education[] }, { cvId: string, data: Education[] }>({
      query: ({ cvId, data }) => ({
        url: `/cvs/${cvId}/content/education`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CVContent', id: cvId },
        { type: 'CV', id: cvId }
      ]
    }),
    
    // Update work experience section
    updateWorkExperience: builder.mutation<{ workExperience: WorkExperience[] }, { cvId: string, data: WorkExperience[] }>({
      query: ({ cvId, data }) => ({
        url: `/cvs/${cvId}/content/workExperience`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CVContent', id: cvId },
        { type: 'CV', id: cvId }
      ]
    }),
    
    // Update summary section
    updateSummary: builder.mutation<{ summary: string }, { cvId: string, data: string }>({
      query: ({ cvId, data }) => ({
        url: `/cvs/${cvId}/content/summary`,
        method: 'PUT',
        body: { summary: data }
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CVContent', id: cvId },
        { type: 'CV', id: cvId }
      ]
    }),
    
    // Change CV template
    changeTemplate: builder.mutation<CV, { cvId: string, templateId: number }>({
      query: ({ cvId, templateId }) => ({
        url: `/cvs/${cvId}`,
        method: 'PUT',
        body: { templateId }
      }),
      invalidatesTags: (result, error, { cvId }) => [
        { type: 'CV', id: cvId },
        { type: 'CV', id: 'LIST' }
      ]
    }),
    
    // Generate CV PDF
    generatePDF: builder.mutation<{ url: string }, string>({
      query: (cvId) => ({
        url: `/cvs/${cvId}/pdf`,
        method: 'POST'
      })
    }),
    
    // Analyze CV and get score/suggestions
    analyzeCV: builder.mutation<{ score: number, suggestions: string[] }, string>({
      query: (cvId) => ({
        url: `/cvs/${cvId}/analyze`,
        method: 'POST'
      })
    })
  })
});

// Export hooks for use in components
export const {
  useGetTemplatesQuery,
  useGetAISuggestionMutation,
  useUpdatePersonalInfoMutation,
  useUpdateSkillsMutation,
  useUpdateEducationMutation,
  useUpdateWorkExperienceMutation,
  useUpdateSummaryMutation,
  useChangeTemplateMutation,
  useGeneratePDFMutation,
  useAnalyzeCVMutation
} = cvBuilderApiSlice;