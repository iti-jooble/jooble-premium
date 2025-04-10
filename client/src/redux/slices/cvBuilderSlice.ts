import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  ICVBuilderInitResponse,
  ICvJsonModelApi,
  IPersonalInfoApi,
  IWorkPlaceApi,
  IEducationPlaceApi,
  ILanguageApi,
  ICareerObjectiveApi,
  CvSource,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

import {
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  CV,
  CVTemplate,
} from "../../types/state/cvBuilder.types";

import {
  convertFromCvJsonModel,
  convertToCvJsonModel,
  convertWorkExperienceToApi,
  convertEducationToApi,
  convertPersonalInfoToApi,
} from "../../adapters/cvBuilderAdapter";

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
    } catch (error) {
      return rejectWithValue(error.message);
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
      const state = getState() as { cvBuilder: CvBuilderState };
      const { cvData, buildCvId } = state.cvBuilder;
      const { html, css } = payload;

      if (!cvData || !buildCvId) {
        throw new Error("CV data or build ID not available");
      }

      const request: ICreateCvRequest = {
        buildCvId,
        source: cvData.source,
        json: cvData,
        jdpId: cvData.jdpId,
        step: cvData.step,
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
    } catch (error) {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Define our state interface
interface CvBuilderState {
  // Minimal API reference data (just the ID needed to make API calls)
  buildCvId: string | null;
  
  // UI state data
  initialized: boolean;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  templateId: number;
  
  // Our main app model (the source of truth for the UI)
  personalInfo: Partial<PersonalInfo>;
  summary: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  
  // UI related
  lastSuggestedContent: string | null;
  suggestingSection: string | null;
}

const initialState: CvBuilderState = {
  // Minimal API reference data
  buildCvId: null,
  
  // UI state
  initialized: false,
  currentStep: 1,
  isLoading: false,
  error: null,
  templateId: 1,
  
  // App model - initialized with empty values
  personalInfo: {},
  summary: '',
  skills: [],
  education: [],
  workExperience: [],
  
  // UI related
  lastSuggestedContent: null,
  suggestingSection: null
};

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
      action: PayloadAction<Partial<PersonalInfo>>,
    ) => {
      // Update only the app model
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    // Update work experience
    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      // Update only the app model
      state.workExperience = action.payload;
    },

    // Update education
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      // Update only the app model
      state.education = action.payload;
    },

    // Update skills
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      // Update only the app model
      state.skills = action.payload;
    },

    // Update summary
    updateSummary: (state, action: PayloadAction<string>) => {
      // Update only the app model
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
        const { initial, buildCvId } = action.payload;

        // Store only the minimal API reference data needed for future API calls
        state.buildCvId = buildCvId;
        state.currentStep = initial.step;
        state.templateId = initial.templateId;
        state.initialized = true;
        state.isLoading = false;

        // Adapt API model to our app model
        const adaptedData = convertFromCvJsonModel(initial);

        // Update app model properties directly
        state.personalInfo = adaptedData.personalInfo || {};
        state.summary = adaptedData.summary || "";
        state.skills = adaptedData.skills || [];
        state.education = adaptedData.education || [];
        state.workExperience = adaptedData.workExperience || [];
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
        // No need to store anything here as we're just confirming the CV was created
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
