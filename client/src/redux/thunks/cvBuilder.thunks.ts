import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAISuggestResponse,
  ICreateCvRequest,
} from "../../types/api/cvBuilder.types";
import { IUpdateCvRequest } from "../../types/api/cvBuilder.types";
import { getErrorMessage } from "../helpers";
import { cvApiSlice } from "../api/cvApiSlice";
import { CV } from "@shared/schema";
import { PdfDataCreator } from "@/components/cv-builder/Templates/PdfDataCreator";
import axios from "axios";
import { updatePreferences } from "@/redux/thunks";
import {
  createOrUpdateCv as createOrUpdateCvLocaly,
  getUserCv as getUserCvLocaly,
  clearUserCv as clearUserCvLocaly,
} from "@/utils/localStorage";
import { IPromptConfig } from "@/types/state/cvBuilder.types";

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
      console.log(error);
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
      return rejectWithValue(error);
    }
  },
);

/**
 * AsyncThunk for creating a new CV
 * Uses the API slice's createCv endpoint
 */
export const createCv = createAsyncThunk<number, ICreateCvRequest>(
  "cvBuilder/createCv",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        cvApiSlice.endpoints.createCV.initiate(payload),
      );

      await dispatch(getCvList());

      if (!result.data) {
        throw new Error("Failed to create CV");
      }

      return result.data.cvId;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

/**
 * AsyncThunk for updating an existing CV
 * Uses the API slice's updateCv endpoint
 */
export const updateCv = createAsyncThunk<void, IUpdateCvRequest>(
  "cvBuilder/updateCv",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        cvApiSlice.endpoints.updateCV.initiate(payload),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const createOrUpdateCv = createAsyncThunk<void, CV>(
  "cvBuilder/createOrUpdateCv",
  async (cv, { dispatch, rejectWithValue }) => {
    try {
      // Import dynamically to avoid circular dependencies
      const { calculateCvScore } = await import("../../lib/cvScoreUtils");

      const score = calculateCvScore(cv.userInfo);

      const pdfDataCreator = new PdfDataCreator({
        templateId: cv.templateId,
      });

      const { html, css } = pdfDataCreator.createPdfData();

      const request = {
        cvModel: { ...cv, score },
        html,
        css,
      };

      if (cv.id == 0) {
        await dispatch(createCv(request));
      } else {
        await dispatch(updateCv({ ...request, id: cv.id }));
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

/**
 * AsyncThunk for deleting a CV
 * Uses the API slice's deleteCv endpoint
 */
export const deleteCv = createAsyncThunk<void, number>(
  "cvBuilder/deleteCv",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(cvApiSlice.endpoints.deleteCV.initiate(id));

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      await dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

/**
 * AsyncThunk for duplicating a CV
 * Uses the API slice's duplicateCv endpoint
 */
export const duplicateCv = createAsyncThunk<void, number>(
  "cvBuilder/duplicateCv",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        cvApiSlice.endpoints.duplicateCV.initiate(payload),
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      await dispatch(getCvList());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const downloadCv = createAsyncThunk<void, { id: number; title: string }>(
  "cvBuilder/downloadCv",
  async (cv) => {
    const response = await axios.get(`/api/cvs/${cv.id}/download`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${cv.title}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  },
);

/**
 * AsyncThunk for parsing a CV from a file
 * Uses the API slice's parseCv endpoint
 */
export const parseCv = createAsyncThunk<void, FormData>(
  "cvBuilder/parseCv",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(
        cvApiSlice.endpoints.parseCV.initiate(payload),
      );

      if (!result.data) {
        throw new Error("Failed to parse CV");
      }

      dispatch(updatePreferences(result.data.preferences));
      createOrUpdateCvLocaly(result.data.cv);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const tryCreateCvFromLocalStorage = createAsyncThunk(
  "cvBuilder/tryCreateCvFromLocalStorage",
  async (_, { dispatch }) => {
    const cv = getUserCvLocaly();

    if (cv) {
      await dispatch(createCv({ cvModel: { ...cv, templateId: 1, score: 0 } }));

      clearUserCvLocaly();
    }
  },
);

export const initAiAssistant = createAsyncThunk<string | null, IPromptConfig>(
  "cvBuilder/initAiAssistant",
  async (data: IPromptConfig, { dispatch }) => {
    try {
      const response = await dispatch(
        cvApiSlice.endpoints.getAISuggestion.initiate(data),
      );

      if (!response.data) {
        throw new Error("Failed to get AI suggestion");
      }

      return response.data.content;
    } catch (error) {
      return null;
    }
  },
);
