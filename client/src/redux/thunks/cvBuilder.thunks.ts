import { createAsyncThunk } from "@reduxjs/toolkit";
import { CvSource, ICreateCvRequest } from "../../types/api/cvBuilder.types";
import { IUpdateCvRequest } from "../../types/api/cvBuilder.types";
import { getErrorMessage } from "../helpers";
import { cvApiSlice } from "../api/cvApiSlice";
import { CV } from "@shared/schema";
import { RootState } from "../store";
import { getCurrentCvSelector } from "../slices/cvBuilderSlice";

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

      return result.data.cvList;
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
export const createCv = createAsyncThunk<string, { templateId?: number } | undefined>(
  "cvBuilder/createCv",
  async (payload = {}, { dispatch, rejectWithValue }) => {
    try {
      const { templateId = 1 } = payload;
      
      const request: ICreateCvRequest = {
        cvModel: {
          source: CvSource.MANUAL,
          title: "New CV",
          templateId: templateId,
          userInfo: {
            personalInfo: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              city: "",
              country: "",
            },
            summary: "",
            skills: [],
            experience: [],
            education: [],
          },
        },
      };

      const result = await dispatch(
        cvApiSlice.endpoints.createCV.initiate(request),
      );

      await dispatch(getCvList());

      if (!result.data) {
        throw new Error("Failed to create CV");
      }

      return result.data.cvId;
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

      // Import dynamically to avoid circular dependencies
      const { calculateCvScore } = await import("../../lib/cvScoreUtils");

      // Create the updated CV data
      const updatedCvData: CV = {
        ...currentCv,
        ...partialCv,
        userInfo: {
          ...currentCv.userInfo,
          ...partialCv.userInfo,
        },
      };

      // Calculate the score
      const score = calculateCvScore(updatedCvData.userInfo);

      const request: IUpdateCvRequest = {
        id: updatedCvData.id,
        cvModel: { ...updatedCvData, score },
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
