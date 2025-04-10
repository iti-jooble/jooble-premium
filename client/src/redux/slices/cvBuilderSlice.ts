import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CvSource, ICreateCvRequest } from "../../types/api/cvBuilder.types";

import { ICVBuilderState } from "../../types/state/cvBuilder.types";
import { cvBuilderApiSlice } from "../api/cvBuilderApiSlice";

// Extract endpoint references for use in our thunks
const { 
  initCvBuilder: initCvBuilderApi, 
  createCv: createCvApi,
  updateCv: updateCvApi,
  deleteCv: deleteCvApi,
  duplicateCv: duplicateCvApi
} = cvBuilderApiSlice.endpoints;

export const initCvBuilder = createAsyncThunk(
  "cvBuilder/initCvBuilder",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(initCvBuilderApi.initiate());

      if (result.error) {
        throw result.error;
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred initializing CV builder",
      );
    }
  },
);

export const createCv = createAsyncThunk(
  "cvBuilder/createCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const { html, css } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const currentCv = cvBuilder.cvList.find(
        (cv) => cv.id === cvBuilder.currentCvId,
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

      const result = await dispatch(createCvApi.initiate(request));

      if (result.error) {
        throw result.error;
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * AsyncThunk for updating an existing CV
 * Uses the API slice's updateCv endpoint
 */
export const updateCv = createAsyncThunk(
  "cvBuilder/updateCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const { html, css } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const currentCv = cvBuilder.cvList.find(
        (cv) => cv.id === cvBuilder.currentCvId,
      );

      if (!currentCv) {
        throw new Error("Selected CV not found");
      }

      const request = {
        id: cvBuilder.currentCvId,
        json: currentCv,
        html,
        css,
      };

      const result = await dispatch(updateCvApi.initiate(request));

      if (result.error) {
        throw result.error;
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * AsyncThunk for deleting a CV
 * Uses the API slice's deleteCv endpoint
 */
export const deleteCv = createAsyncThunk(
  "cvBuilder/deleteCv",
  async (
    id: string,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const result = await dispatch(
        deleteCvApi.initiate({ id })
      );

      if (result.error) {
        throw result.error;
      }

      return { id, ...result.data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * AsyncThunk for duplicating a CV
 * Uses the API slice's duplicateCv endpoint
 */
export const duplicateCv = createAsyncThunk(
  "cvBuilder/duplicateCv",
  async (
    payload: { id: string; newTitle?: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const result = await dispatch(
        duplicateCvApi.initiate(payload)
      );

      if (result.error) {
        throw result.error;
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

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
        state.cvList = action.payload?.cvList || [];
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
      
      // Handle updateCv actions
      .addCase(updateCv.pending, (state) => {
        state.isLoading = true;
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateCv.fulfilled, (state) => {
        state.isLoading = false;
        state.isSaving = false;
        // We don't need to update the state as the API slice will handle cache invalidation
      })
      .addCase(updateCv.rejected, (state, action) => {
        state.isLoading = false;
        state.isSaving = false;
        state.error = action.payload as string;
      })
      
      // Handle deleteCv actions
      .addCase(deleteCv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCv.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted CV from the list
        state.cvList = state.cvList.filter(cv => cv.id !== action.payload.id);
        // If the deleted CV was the current one, clear the current CV ID
        if (state.currentCvId === action.payload.id) {
          state.currentCvId = null;
        }
      })
      .addCase(deleteCv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Handle duplicateCv actions
      .addCase(duplicateCv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(duplicateCv.fulfilled, (state, action) => {
        state.isLoading = false;
        // If the API returned a new CV, add it to our list
        if (action.payload.cv) {
          state.cvList = [...state.cvList, action.payload.cv];
        }
      })
      .addCase(duplicateCv.rejected, (state, action) => {
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
