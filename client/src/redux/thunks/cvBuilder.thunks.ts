import { createAsyncThunk } from "@reduxjs/toolkit";
import { CvSource, ICreateCvRequest } from "../../types/api/cvBuilder.types";
import { IUpdateCvRequest } from "../../types/api/cvBuilder.types";
import { cvBuilderApiSlice } from "../api/cvBuilderApiSlice";
import { getErrorMessage } from "../helpers";
import { cvApiSlice } from "../api/cvApiSlice";
import { CV } from "@shared/schema";
import { RootState } from "../store";
import { getCurrentCvSelector, setCurrentCvId } from "../slices/cvBuilderSlice";

/**
 * AsyncThunk for initializing the CV builder
 * Fetches initial data and prepares the state
 */
export const initCvBuilder = createAsyncThunk(
  "cvBuilder/initCvBuilder",
  async (_, { dispatch }) => {
    try {
      await dispatch(getCvList());
    } catch (error: any) {
      console.log(error.message || "An error occurred initializing CV builder");
    }
  },
);

export const getCvList = createAsyncThunk<CV[]>(
  "cvBuilder/getCvList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(cvApiSlice.endpoints.getCVs.initiate());

      if (!result.data) {
        throw new Error("Failed to fetch CV list");
      }

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred fetching CV list",
      );
    }
  },
);

/**
 * AsyncThunk for creating a new CV
 * Uses the API slice's createCv endpoint
 */
export const createCv = createAsyncThunk<CV>(
  "cvBuilder/createCv",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const request: ICreateCvRequest = {
        source: CvSource.MANUAL,
      };

      const result = await dispatch(
        cvApiSlice.endpoints.createCV.initiate(request),
      );

      if (!result.data) {
        throw new Error("Failed to create CV");
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
      partialCv: Partial<CV>;
      html: string;
      css: string;
    },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const { html, css, partialCv } = payload;
      const state = getState() as RootState;
      const currentCv = getCurrentCvSelector(state);

      if (!currentCv) {
        throw new Error("Selected CV not found");
      }

      const request: IUpdateCvRequest = {
        id: currentCv.id,
        cvData: { ...currentCv, ...partialCv },
        html,
        css,
      };

      const result = await dispatch(
        cvApiSlice.endpoints.updateCV.initiate(request),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * AsyncThunk for deleting a CV
 * Uses the API slice's deleteCv endpoint
 */
export const deleteCv = createAsyncThunk<void, string>(
  "cvBuilder/deleteCv",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      // Use the mutation hook directly from the API slice
      const result = await dispatch(cvApiSlice.endpoints.deleteCV.initiate(id));

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      await dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * AsyncThunk for duplicating a CV
 * Uses the API slice's duplicateCv endpoint
 */
export const duplicateCv = createAsyncThunk<void, string>(
  "cvBuilder/duplicateCv",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      // Use the mutation hook directly from the API slice
      const result = await dispatch(
        cvApiSlice.endpoints.duplicateCV.initiate(payload),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      await dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
