import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CvSource,
  ICreateCvRequest
} from "../../types/api/cvBuilder.types";

import { ICVBuilderState } from "../../types/state/cvBuilder.types";

// Import the API slice for the CV Builder
import { cvBuilderApiSlice } from "../api/cvBuilderApiSlice";

// Import API hooks for use in thunks
const {
  initCvBuilder: initCvBuilderEndpoint,
  createCv: createCvEndpoint,
  getAiSuggestion: getAiSuggestionEndpoint
} = cvBuilderApiSlice.endpoints;

/**
 * Using thunks that wrap the RTK Query API endpoints
 * This allows us to:
 * 1. Keep our existing reducer behavior
 * 2. Use the API slice for data fetching
 * 3. Add custom behavior before/after API calls
 */

/**
 * AsyncThunk for initializing the CV builder
 * Uses the API slice's initCvBuilder endpoint
 */
export const initCvBuilder = createAsyncThunk(
  "cvBuilder/initCvBuilder",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        initCvBuilderEndpoint.initiate()
      );
      
      if (result.error) {
        throw new Error(result.error.message || "Failed to initialize CV builder");
      }
      
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred initializing CV builder"
      );
    }
  }
);

/**
 * AsyncThunk for creating a CV
 * Uses the API slice's createCv endpoint
 */
export const createCv = createAsyncThunk(
  "cvBuilder/createCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { html, css } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };
      
      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }
      
      const currentCv = cvBuilder.cvList.find(
        (cv) => cv.id === cvBuilder.currentCvId
      );
      
      if (!currentCv) {
        throw new Error("Selected CV not found");
      }
      
      const request: ICreateCvRequest = {
        id: cvBuilder.currentCvId,
        source: CvSource.MANUAL,
        json: currentCv,
        html,
        css,
      };
      
      const result = await dispatch(
        createCvEndpoint.initiate(request)
      );
      
      if (result.error) {
        throw new Error(result.error.message || "Failed to create CV");
      }
      
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * AsyncThunk for getting AI suggestions
 * Uses the API slice's getAiSuggestion endpoint
 */
export const getAiSuggestion = createAsyncThunk(
  "cvBuilder/getAiSuggestion",
  async (
    payload: {
      type: string;
      userContent: string;
      systemReplacements?: Record<string, string>;
    },
    { dispatch }
  ) => {
    try {
      const result = await dispatch(
        getAiSuggestionEndpoint.initiate(payload)
      );
      
      if (result.error) {
        return null;
      }
      
      return result.data?.content || null;
    } catch (error) {
      return null;
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
        // We don't store the suggestion in state
      })
      .addCase(getAiSuggestion.rejected, (state) => {
        state.isLoading = false;
        // No error handling needed as we return null in the thunk
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
