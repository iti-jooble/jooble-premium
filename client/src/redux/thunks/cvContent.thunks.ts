import { createAsyncThunk } from "@reduxjs/toolkit";
import { CVBuilderState } from "../../types/state/cvBuilder.types";

/**
 * AsyncThunk for updating personal information
 */
export const updatePersonalInfo = createAsyncThunk(
  "cvBuilder/updatePersonalInfo",
  async (personalInfo: any, { getState }) => {
    return personalInfo;
  }
);

/**
 * AsyncThunk for updating work experience
 */
export const updateWorkExperience = createAsyncThunk(
  "cvBuilder/updateWorkExperience",
  async (workExperience: any[], { getState }) => {
    return workExperience;
  }
);

/**
 * AsyncThunk for updating education
 */
export const updateEducation = createAsyncThunk(
  "cvBuilder/updateEducation",
  async (education: any[], { getState }) => {
    return education;
  }
);

/**
 * AsyncThunk for updating skills
 */
export const updateSkills = createAsyncThunk(
  "cvBuilder/updateSkills",
  async (skills: any[], { getState }) => {
    return skills;
  }
);

/**
 * AsyncThunk for updating summary
 */
export const updateSummary = createAsyncThunk(
  "cvBuilder/updateSummary",
  async (summary: string, { getState }) => {
    return summary;
  }
);

/**
 * AsyncThunk for setting template ID
 */
export const setTemplateId = createAsyncThunk(
  "cvBuilder/setTemplateId",
  async (templateId: number, { getState }) => {
    return templateId;
  }
);

/**
 * AsyncThunk for setting suggesting section
 */
export const setSuggestingSection = createAsyncThunk(
  "cvBuilder/setSuggestingSection",
  async (section: string | null, { getState }) => {
    return section;
  }
);