import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICVBuilderInitResponse,
  ICreateCvRequest,
  ICreateCvResponse,
  CvSource,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

import {
  ICVBuilderState,
  ICv,
} from "../../types/state/cvBuilder.types";

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
      id: string;
      cv: ICv;
      html: string;
      css: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { id, cv, html, css } = payload;

      const request: ICreateCvRequest = {
        id,
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
 * Contains ONLY ICVBuilderState properties
 */
const initialState: ICVBuilderState = {
  currentCvId: null,
  cvList: [],
  isLoading: false,
  isInitialized: false,
  isEditing: false,
  currentSection: "",
  isSaving: false,
  error: null,
};

/**
 * CV Builder slice with reducers and extra reducers for async actions
 * Using STRICTLY ICVBuilderState interface
 */
const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  reducers: {
    // Set the current CV ID
    setCurrentCvId: (state, action: PayloadAction<string | null>) => {
      state.currentCvId = action.payload;
    },
    
    // Set editing state
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    
    // Set current section
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    },
    
    // Set saving state
    setIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
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
        state.isLoading = false;
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
        // After creation, we would typically update or add the CV to the list
        // but we're keeping the state minimal
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
      .addCase(getAiSuggestion.fulfilled, (state) => {
        state.isLoading = false;
        // We don't store the suggestion in state as it's not part of ICVBuilderState
      })
      .addCase(getAiSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentCvId,
  setIsEditing,
  setCurrentSection,
  setIsSaving,
  resetCvBuilder,
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;