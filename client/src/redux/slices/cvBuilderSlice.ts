import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICVBuilderState } from "../../types/state/cvBuilder.types";
import {
  initCvBuilder,
  createCv,
  updateCv,
  deleteCv,
  duplicateCv,
} from "../thunks/cvBuilder.thunks";

const initialState: ICVBuilderState = {
  currentCvId: "1",
  cvList: [],
  isLoading: false,
  isInitialized: false,
  isSaving: false,
  error: null,
};

const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  selectors: {
    getCurrentCvSelector: (state) =>
      state.cvList.find((cv) => cv.id === state.currentCvId),
  },
  reducers: {
    // Set the current CV ID
    setCurrentCvId: (state, action: PayloadAction<string | null>) => {
      state.currentCvId = action.payload;
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
        state.cvList = action.payload || [];
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
      .addCase(duplicateCv.fulfilled, (state) => {
        state.isLoading = false;
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

export const { getCurrentCvSelector } = cvBuilderSlice.selectors;

export default cvBuilderSlice.reducer;
