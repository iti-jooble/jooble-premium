import { createAsyncThunk } from "@reduxjs/toolkit";
import { CvSource, ICreateCvRequest } from "../../types/api/cvBuilder.types";
import { ICv, ICVBuilderState } from "../../types/state/cvBuilder.types";
import { cvBuilderApiSlice } from "../api/cvBuilderApiSlice";
import { getErrorMessage } from "../helpers";

/**
 * AsyncThunk for initializing the CV builder
 * Fetches initial data and prepares the state
 */
export const initCvBuilder = createAsyncThunk(
  "cvBuilder/initCvBuilder",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        cvBuilderApiSlice.endpoints.initCvBuilder.initiate(),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred initializing CV builder",
      );
    }
  },
);

/**
 * AsyncThunk for creating a new CV
 * Uses the API slice's createCv endpoint
 */
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

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.createCv.initiate(request),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
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
      partialCv: Partial<ICv>;
      html: string;
      css: string;
    },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const { html, css, partialCv } = payload;
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
        json: { ...currentCv, ...partialCv },
        html,
        css,
      };

      // Use the mutation hook directly from the API slice
      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updateCv.initiate(request),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
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
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      // Use the mutation hook directly from the API slice
      const result = await dispatch(
        cvBuilderApiSlice.endpoints.deleteCv.initiate({ id }),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
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
      // Use the mutation hook directly from the API slice
      const result = await dispatch(
        cvBuilderApiSlice.endpoints.duplicateCv.initiate(payload),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
