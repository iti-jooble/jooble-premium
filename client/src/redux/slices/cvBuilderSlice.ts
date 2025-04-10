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
  ISkill,
  IEducation,
  IWorkExperience,
  ICv,
  ICVBuilderState,
} from "../../types/state/cvBuilder.types";

/**
 * Define the extended state that includes both ICVBuilderState properties
 * and additional properties needed for the CV builder functionality
 */
interface ICVBuilderExtendedState extends ICVBuilderState {
  // Additional properties for CV editing
  buildCvId?: string;
  currentStep: number;
  templateId: number;
  personalInfo: Partial<IPersonalInfo>;
  summary: string;
  skills: ISkill[];
  education: IEducation[];
  workExperience: IWorkExperience[];
  suggestingSection: string | null;
  lastSuggestedContent?: string;
  
  // Any other properties not in ICVBuilderState but needed for the slice
  initialized: boolean;
}

// API base URL for CV builder
const API_BASE_URL = "/api";

/**
 * AsyncThunk for initializing the CV builder
 * Fetches initial data from the API
 */
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
        error.message || "An error occurred initializing CV builder"
      );
    }
  }
);

/**
 * AsyncThunk for creating a CV
 * Sends CV data to the API
 */
export const createCv = createAsyncThunk(
  "cvBuilder/createCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { cvBuilder: ICVBuilderExtendedState };
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

      // Create a valid CV object for the API
      const cv: ICv = {
        id: buildCvId,
        title: personalInfo.title || "Untitled CV",
        dateCreated: new Date().toISOString(),
        templateId: templateId,
        personalInfo,
        summary,
        skills,
        education,
        workExperience,
      };

      // Create the request object
      const request: ICreateCvRequest = {
        id: buildCvId,
        source: CvSource.MANUAL,
        json: cv,
        html,
        css,
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/create`, {
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
  }
);

/**
 * AsyncThunk for getting AI suggestions
 * Sends prompt data to the API and receives AI-generated content
 */
export const getAiSuggestion = createAsyncThunk(
  "cvBuilder/getAiSuggestion",
  async (
    payload: {
      type: string;
      userContent: string;
      systemReplacements?: Record<string, string>;
    },
    { rejectWithValue }
  ) => {
    try {
      const promptConfig: IPromptConfigApi = {
        type: payload.type,
        userReplacements: {
          content: payload.userContent,
        },
        systemReplacements: payload.systemReplacements || {},
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/suggest`, {
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
        error.message || "An error occurred getting AI suggestion"
      );
    }
  }
);

/**
 * Initial state for the CV builder slice
 * Contains both ICVBuilderState properties and additional properties
 */
const initialState: ICVBuilderExtendedState = {
  // ICVBuilderState properties
  currentCvId: null,
  cvList: [],
  isLoading: false,
  isInitialized: false,
  isEditing: false,
  currentSection: "",
  isSaving: false,
  error: null,
  
  // Additional properties
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

/**
 * CV Builder slice with reducers and extra reducers for async actions
 */
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
      action: PayloadAction<Partial<IPersonalInfo>>
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
      }>
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
        state.cvList = action.payload.cvList || [];
        state.isInitialized = true;
        state.initialized = true;
        state.isLoading = false;
        
        // If there's additional data in the response, we could handle it here
        // This depends on the actual structure of ICVBuilderInitResponse
      })
      .addCase(initCvBuilder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle createCv actions
      .addCase(createCv.pending, (state) => {
        state.isLoading = true;
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaving = false;
        // Here we could update the state with the created CV if needed
      })
      .addCase(createCv.rejected, (state, action) => {
        state.isLoading = false;
        state.isSaving = false;
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