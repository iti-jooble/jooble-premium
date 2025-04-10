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
  CVBuilderState,
} from "../../types/state/cvBuilder.types";

import {
  convertFromCvJsonModel,
  convertToCvJsonModel,
  convertWorkExperienceToApi,
  convertEducationToApi,
  convertPersonalInfoToApi,
} from "../../adapters/cvBuilderAdapter";

// Extended state interface that combines the CVBuilderState with our additional properties
interface ExtendedCVBuilderState extends CVBuilderState {
  buildCvId?: string;
  currentStep: number;
  templateId: number;
  personalInfo: Partial<PersonalInfo>;
  summary: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  suggestingSection: string | null;
}

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
      const state = getState() as { cvBuilder: CvBuilderState };
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

      // Convert our app model to API model only when sending to API
      const apiModel = convertToCvJsonModel({
        buildCvId,
        step: currentStep,
        templateId,
        personalInfo,
        summary,
        skills,
        education,
        workExperience,
        // Default values for required API fields
        source: CvSource.MANUAL,
        referrer: "",
        jdpId: null,
      });

      const request: ICreateCvRequest = {
        buildCvId,
        source: apiModel.source,
        json: apiModel,
        jdpId: apiModel.jdpId,
        step: apiModel.step,
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

// Extended state to include both the CVBuilderState and our API-related fields
interface ExtendedCVBuilderState extends CVBuilderState {
  buildCvId?: string;
  currentStep: number;
  templateId: number;
  personalInfo: Partial<PersonalInfo>;
  summary: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  suggestingSection: string | null;
}

const initialState: ExtendedCVBuilderState = {
  // Properties from CVBuilderState
  currentCvId: "",
  cvList: [],
  isEditing: false,
  currentSection: "personal-info",
  initialized: false,
  isLoading: false,
  isSaving: false,
  error: null,
  lastSuggestedContent: null,
  
  // Additional properties needed for our implementation
  currentStep: 1,
  templateId: 1,
  personalInfo: {},
  summary: "",
  skills: [],
  education: [],
  workExperience: [],
  suggestingSection: null,
};

const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    },

    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfo>>,
    ) => {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workExperience = action.payload;
    },

    updateEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },

    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },

    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },

    setTemplateId: (state, action: PayloadAction<number>) => {
      state.templateId = action.payload;
    },

    setSuggestingSection: (state, action: PayloadAction<string | null>) => {
      state.suggestingSection = action.payload;
    },

    resetCvBuilder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initCvBuilder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initCvBuilder.fulfilled, (state, action) => {
        const { initial, buildCvId } = action.payload;

        state.buildCvId = buildCvId;
        state.currentStep = initial.step;
        state.templateId = initial.templateId;
        state.initialized = true;
        state.isLoading = false;

        const adaptedData = convertFromCvJsonModel(initial);

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

      .addCase(createCv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

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
  setTemplateId,
  setSuggestingSection,
  resetCvBuilder,
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;
