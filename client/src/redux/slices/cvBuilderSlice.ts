import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICVBuilderInitResponse,
  ICreateCvResponse,
} from "../../types/api/cvBuilder.types";

import {
  ICVBuilderState,
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