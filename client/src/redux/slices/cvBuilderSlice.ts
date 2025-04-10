import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICVBuilderInitResponse,
  CvSource,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

import {
  IPersonalInfo,
  IWorkExperience,
  IEducation,
  ISkill,
  ICv,
  ICVBuilderState,
} from "../../types/state/cvBuilder.types";

// API base URL for CV builder
const API_BASE_URL = "/api";

// Define AsyncThunk for initializing CV builder
export const initCvBuilder = createAsyncThunk(
  "cvBuilder/initCvBuilder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cvbuilder/init`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to initialize CV builder");
      }

      const data: ICVBuilderInitResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred initializing CV builder",
      );
    }
  },
);

// Define AsyncThunk for creating a CV
export const createCv = createAsyncThunk(
  "cvBuilder/createCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as { cvBuilder: ExtendedCVBuilderState };
      const {
        buildCvId,
        currentStep,
        templateId,
        personalInfo,
        summary,
        skills,
        education,
        workExperience,
      } = state.cvBuilder;
      const { html, css } = payload;

      if (!buildCvId) {
        throw new Error("CV build ID not available");
      }

      // Create the API model directly here (no adapter needed)
      const apiModel = {
        jdpId: null,
        buildCvId,
        step: currentStep || 1,
        source: CvSource.MANUAL,
        referrer: "",
        templateId: templateId || 1,
        personalInfo: {
          fullName: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(),
          firstName: personalInfo.firstName || '',
          lastName: personalInfo.lastName || '',
          email: personalInfo.email || '',
          phone: personalInfo.phone || '',
          city: personalInfo.city || '',
          country: personalInfo.country || '',
        },
        careerObjective: {
          position: personalInfo.title || null,
          skills: skills.map((s: ISkill) => s.name).join(', ') || null,
          skillSet: skills.map((s: ISkill) => s.name),
        },
        experience: {
          workPlaces: workExperience.map((w: IWorkExperience) => ({
            id: w.id,
            position: w.position,
            company: w.company,
            startYear: w.startYear,
            endYear: w.endYear || '',
            responsibilities: w.description,
            isStillWorking: w.isCurrent,
            period: `${w.startYear} - ${w.isCurrent ? 'Present' : w.endYear || ''}`,
          })),
          hasExperience: workExperience.length > 0,
          professionalSkills: skills.map((s: ISkill) => s.name).join(', '),
          careerObjective: {
            position: personalInfo.title || null,
            skills: skills.map((s: ISkill) => s.name).join(', ') || null,
            skillSet: skills.map((s: ISkill) => s.name),
          }
        },
        education: {
          educationPlaces: education.map((e: IEducation) => ({
            id: e.id,
            educationLevel: e.degree,
            admissionYear: e.startYear,
            nameOfInstitution: e.school,
            specialty: e.field || '',
            graduationYear: e.endYear || '',
          })),
          hasEducation: education.length > 0,
        },
        languages: [],
        summary: {
          summary: summary || null,
          recommendJobsByCVConsent: false,
          sendCVImprovementTipsConsent: false,
        },
      };

      const request: ICreateCvRequest = {
        buildCvId,
        source: CvSource.MANUAL,
        json: apiModel,
        jdpId: null,
        step: currentStep || 1,
        html,
        css,
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/createV2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to create CV");
      }

      const data: ICreateCvResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Define AsyncThunk for getting AI suggestions
export const getAiSuggestion = createAsyncThunk(
  "cvBuilder/getAiSuggestion",
  async (
    payload: {
      type: string;
      userContent: string;
      systemReplacements?: Record<string, string>;
    },
    { rejectWithValue },
  ) => {
    try {
      const promptConfig: IPromptConfigApi = {
        type: payload.type,
        userReplacements: {
          content: payload.userContent,
        },
        systemReplacements: payload.systemReplacements || {},
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/suggestv2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptConfig),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion");
      }

      const data: IAISuggestResponse = await response.json();
      return {
        type: payload.type,
        content: data.content,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred getting AI suggestion",
      );
    }
  },
);

// Extended state interface with properties not in ICVBuilderState
interface ExtendedState {
  buildCvId?: string;
  currentStep: number;
  templateId: number;
  initialized: boolean;
  personalInfo: Partial<IPersonalInfo>;
  summary: string;
  skills: ISkill[];
  education: IEducation[];
  workExperience: IWorkExperience[];
  suggestingSection: string | null;
  lastSuggestedContent?: string;
}

// Combined interface for the full state
type ExtendedCVBuilderState = ICVBuilderState & ExtendedState;

// Define the initial state
const initialState: ExtendedCVBuilderState = {
  // ICVBuilderState properties
  currentCvId: null,
  cvList: [],
  isLoading: false,
  isInitialized: false,
  isEditing: false,
  currentSection: "",
  isSaving: false,
  error: null,
  
  // Extended state properties
  buildCvId: undefined,
  currentStep: 1,
  templateId: 1,
  initialized: false,
  personalInfo: {},
  summary: "",
  skills: [],
  education: [],
  workExperience: [],
  suggestingSection: null,
  lastSuggestedContent: undefined,
};

// Create the cvBuilderSlice
const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  reducers: {
    // Update the current step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Update personal information
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<IPersonalInfo>>,
    ) => {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    // Update work experience
    updateWorkExperience: (state, action: PayloadAction<IWorkExperience[]>) => {
      state.workExperience = action.payload;
    },

    // Update education
    updateEducation: (state, action: PayloadAction<IEducation[]>) => {
      state.education = action.payload;
    },

    // Update skills
    updateSkills: (state, action: PayloadAction<ISkill[]>) => {
      state.skills = action.payload;
    },

    // Update summary
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },

    // Update consent preferences
    updateConsent: (
      state,
      action: PayloadAction<{
        recommendJobsByCVConsent?: boolean;
        sendCVImprovementTipsConsent?: boolean;
      }>,
    ) => {
      // These would be stored with other CV metadata if needed
      // For now, we're not storing this in the state
      // as we only use it when sending data to API
    },

    // Update template ID
    setTemplateId: (state, action: PayloadAction<number>) => {
      state.templateId = action.payload;
    },

    // Update the section being suggested by AI
    setSuggestingSection: (state, action: PayloadAction<string | null>) => {
      state.suggestingSection = action.payload;
    },

    // Reset the CV builder state
    resetCvBuilder: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle initCvBuilder actions
    builder
      .addCase(initCvBuilder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initCvBuilder.fulfilled, (state, action) => {
        // Extract buildCvId and initial data from response
        // Note: These might need to be adjusted based on actual response structure
        const buildCvId = action.payload.buildCvId;
        const initial = action.payload.initial;

        if (buildCvId) {
          state.buildCvId = buildCvId;
        }

        if (initial) {
          // Set step and template ID
          state.currentStep = initial.step || 1;
          state.templateId = initial.templateId || 1;
          
          // Set status flags
          state.initialized = true;
          state.isInitialized = true;
          state.isLoading = false;

          // Map personal info from API response
          const personalInfo: Partial<IPersonalInfo> = {
            firstName: initial.personalInfo?.firstName || '',
            lastName: initial.personalInfo?.lastName || '',
            email: initial.personalInfo?.email || '',
            phone: initial.personalInfo?.phone || '',
            city: initial.personalInfo?.city || '',
            country: initial.personalInfo?.country || '',
            title: initial.careerObjective?.position || '',
          };
          
          // Map skills from API response
          const skills: ISkill[] = (initial.careerObjective?.skillSet || []).map((skill: string, index: number) => ({
            id: `skill-${index}`,
            name: skill,
            level: 'intermediate',
          }));
          
          // Map work experience from API response
          const workExperience: IWorkExperience[] = (initial.experience?.workPlaces || []).map((wp: any) => ({
            id: wp.id || `exp-${Math.random().toString(36).substring(2, 9)}`,
            company: wp.company || '',
            position: wp.position || '',
            startYear: wp.startYear || '',
            endYear: wp.isStillWorking ? null : (wp.endYear || ''),
            description: wp.responsibilities || '',
            isCurrent: wp.isStillWorking || false,
          }));
          
          // Map education from API response
          const education: IEducation[] = (initial.education?.educationPlaces || []).map((edu: any) => ({
            id: edu.id || `edu-${Math.random().toString(36).substring(2, 9)}`,
            school: edu.nameOfInstitution || '',
            degree: edu.educationLevel || '',
            field: edu.specialty || '',
            startYear: edu.admissionYear || '',
            endYear: edu.graduationYear || null,
            isCurrent: false,
          }));
          
          // Update state with mapped data
          state.personalInfo = personalInfo;
          state.summary = initial.summary?.summary || '';
          state.skills = skills;
          state.education = education;
          state.workExperience = workExperience;
        }
      })
      .addCase(initCvBuilder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle createCv actions
      .addCase(createCv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state) => {
        state.isLoading = false;
        // No need to update state here as we're just confirming the CV was created
      })
      .addCase(createCv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle getAiSuggestion actions
      .addCase(getAiSuggestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAiSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastSuggestedContent = action.payload.content;
        // The component will handle accepting the suggestion
      })
      .addCase(getAiSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateSummary,
  updateConsent,
  setTemplateId,
  setSuggestingSection,
  resetCvBuilder,
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;