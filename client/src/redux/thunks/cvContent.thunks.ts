import { createAsyncThunk } from "@reduxjs/toolkit";
import { PersonalInfo, Skill, Education, WorkExperience } from "../../../shared/schema";
import { ICVBuilderState } from "../../types/state/cvBuilder.types";
import { cvBuilderApiSlice } from "../api/cvBuilderApiSlice";
import { getErrorMessage } from "../helpers";

/**
 * AsyncThunk for updating personal info section of a CV
 */
export const updatePersonalInfo = createAsyncThunk(
  "cvContent/updatePersonalInfo",
  async (
    payload: { personalInfo: PersonalInfo },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { personalInfo } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updatePersonalInfo.initiate({
          cvId: cvBuilder.currentCvId,
          data: personalInfo
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred updating personal info"
      );
    }
  }
);

/**
 * AsyncThunk for updating skills section of a CV
 */
export const updateSkills = createAsyncThunk(
  "cvContent/updateSkills",
  async (
    payload: { skills: Skill[] },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { skills } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updateSkills.initiate({
          cvId: cvBuilder.currentCvId,
          data: skills
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred updating skills"
      );
    }
  }
);

/**
 * AsyncThunk for updating education section of a CV
 */
export const updateEducation = createAsyncThunk(
  "cvContent/updateEducation",
  async (
    payload: { education: Education[] },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { education } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updateEducation.initiate({
          cvId: cvBuilder.currentCvId,
          data: education
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred updating education"
      );
    }
  }
);

/**
 * AsyncThunk for updating work experience section of a CV
 */
export const updateWorkExperience = createAsyncThunk(
  "cvContent/updateWorkExperience",
  async (
    payload: { workExperience: WorkExperience[] },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { workExperience } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updateWorkExperience.initiate({
          cvId: cvBuilder.currentCvId,
          data: workExperience
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred updating work experience"
      );
    }
  }
);

/**
 * AsyncThunk for updating summary section of a CV
 */
export const updateSummary = createAsyncThunk(
  "cvContent/updateSummary",
  async (
    payload: { summary: string },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const { summary } = payload;
      const { cvBuilder } = getState() as { cvBuilder: ICVBuilderState };

      if (!cvBuilder.currentCvId) {
        throw new Error("No CV selected");
      }

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.updateSummary.initiate({
          cvId: cvBuilder.currentCvId,
          data: summary
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred updating summary"
      );
    }
  }
);

/**
 * AsyncThunk for getting AI suggestions for CV content
 */
export const getAISuggestion = createAsyncThunk(
  "cvContent/getAISuggestion",
  async (
    payload: { section: string; additionalContext?: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { section, additionalContext } = payload;

      const result = await dispatch(
        cvBuilderApiSlice.endpoints.getAISuggestion.initiate({
          section,
          additionalContext
        })
      );

      if (result.error) {
        throw new Error(getErrorMessage(result.error));
      }

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred getting AI suggestions"
      );
    }
  }
);