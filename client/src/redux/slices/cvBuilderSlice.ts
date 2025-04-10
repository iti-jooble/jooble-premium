import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICVBuilderInitResponse,
  CvSource,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse,
} from "../../types/api/cvBuilder.types";

import {
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  CV,
} from "../../types/state/cvBuilder.types";

// Define our own state interface to match the flat structure
interface CVBuilderState {
  // Basic state properties
  isLoading: boolean;
  error: string | null;

  // CV list management
  currentCvId: string | null;
  cvList: CV[];
  
  // UI state
  isInitialized: boolean;
  isEditing: boolean;
  currentSection: string;
  isSaving: boolean;

  // CV data properties (flattened from nested structure)
  buildCvId?: string;
  currentStep: number;
  templateId: number;
  initialized: boolean;
  personalInfo: Partial<PersonalInfo>;
  summary: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  suggestingSection: string | null;
  lastSuggestedContent?: string;
}

// API base URL for CV builder
const API_BASE_URL = "/api";

// Define AsyncThunk for initializing CV builder
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
        error.message || "An error occurred initializing CV builder",
      );
    }
  },
);

// Define AsyncThunk for creating a CV
export const createCv = createAsyncThunk(
  "cvBuilder/createCv",
  async (
    payload: {
      html: string;
      css: string;
    },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as { cvBuilder: CVBuilderState };
      const {
        buildCvId,
        currentStep,
        templateId,
        personalInfo,
        summary,
        skills,
        education,
        workExperience,
      } = state.cvBuilder;
      const { html, css } = payload;

      if (!buildCvId) {
        throw new Error("CV build ID not available");
      }

      // Create the API model directly here (no adapter needed)
      // This would typically have more conversion logic, but we're keeping it simple
      const apiModel = {
        jdpId: null,
        buildCvId,
        step: currentStep || 1,
        source: CvSource.MANUAL,
        referrer: "",
        templateId: templateId || 1,
        personalInfo: {
          fullName: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(),
          firstName: personalInfo.firstName || '',
          lastName: personalInfo.lastName || '',
          email: personalInfo.email || '',
          phone: personalInfo.phone || '',
          city: personalInfo.city || '',
          country: personalInfo.country || '',
        },
        careerObjective: {
          position: personalInfo.title || null,
          skills: skills.map(s => s.name).join(', ') || null,
          skillSet: skills.map(s => s.name),
        },
        experience: {
          workPlaces: workExperience.map(w => ({
            id: w.id,
            position: w.position,
            company: w.company,
            startYear: w.startYear,
            endYear: w.endYear || '',
            responsibilities: w.description,
            isStillWorking: w.isCurrent,
            period: `${w.startYear} - ${w.isCurrent ? 'Present' : w.endYear || ''}`,
          })),
          hasExperience: workExperience.length > 0,
          professionalSkills: skills.map(s => s.name).join(', '),
          careerObjective: {
            position: personalInfo.title || null,
            skills: skills.map(s => s.name).join(', ') || null,
            skillSet: skills.map(s => s.name),
          }
        },
        education: {
          educationPlaces: education.map(e => ({
            id: e.id,
            educationLevel: e.degree,
            admissionYear: e.startYear,
            nameOfInstitution: e.school,
            specialty: e.field || '',
            graduationYear: e.endYear || '',
          })),
          hasEducation: education.length > 0,
        },
        languages: [],
        summary: {
          summary: summary || null,
          recommendJobsByCVConsent: false,
          sendCVImprovementTipsConsent: false,
        },
      };

      const request: ICreateCvRequest = {
        buildCvId,
        source: CvSource.MANUAL,
        json: apiModel,
        jdpId: null,
        step: currentStep || 1,
        html,
        css,
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/createV2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to create CV");
      }

      const data: ICreateCvResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Define AsyncThunk for getting AI suggestions
export const getAiSuggestion = createAsyncThunk(
  "cvBuilder/getAiSuggestion",
  async (
    payload: {
      type: string;
      userContent: string;
      systemReplacements?: Record<string, string>;
    },
    { rejectWithValue },
  ) => {
    try {
      const promptConfig: IPromptConfigApi = {
        type: payload.type,
        userReplacements: {
          content: payload.userContent,
        },
        systemReplacements: payload.systemReplacements || {},
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/suggestv2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptConfig),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI suggestion");
      }

      const data: IAISuggestResponse = await response.json();
      return {
        type: payload.type,
        content: data.content,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred getting AI suggestion",
      );
    }
  },
);

const initialState: CVBuilderState = {
  // Basic state properties
  isLoading: false,
  error: null,

  // CV list management
  currentCvId: null,
  cvList: [],
  
  // UI state
  isInitialized: false,
  isEditing: false,
  currentSection: "",
  isSaving: false,

  // CV data properties (flattened from nested structure)
  buildCvId: undefined,
  currentStep: 1,
  templateId: 1,
  initialized: false,
  personalInfo: {},
  summary: "",
  skills: [],
  education: [],
  workExperience: [],
  suggestingSection: null,
  lastSuggestedContent: undefined,
};

const cvBuilderSlice = createSlice({
  name: "cvBuilder",
  initialState,
  reducers: {
    // Update the current step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Update personal information
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfo>>,
    ) => {
      // Update only the app model
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload,
      };
    },

    // Update work experience
    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      // Update only the app model
      state.workExperience = action.payload;
    },

    // Update education
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      // Update only the app model
      state.education = action.payload;
    },

    // Update skills
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      // Update only the app model
      state.skills = action.payload;
    },

    // Update summary
    updateSummary: (state, action: PayloadAction<string>) => {
      // Update only the app model
      state.summary = action.payload;
    },

    // Update consent preferences
    updateConsent: (
      state,
      action: PayloadAction<{
        recommendJobsByCVConsent?: boolean;
        sendCVImprovementTipsConsent?: boolean;
      }>,
    ) => {
      // These would be stored with other CV metadata if needed
      // For now, we're not storing this in the state
      // as we only use it when sending data to API
    },

    // Update template ID
    setTemplateId: (state, action: PayloadAction<number>) => {
      state.templateId = action.payload;
    },

    // Update the section being suggested by AI
    setSuggestingSection: (state, action: PayloadAction<string | null>) => {
      state.suggestingSection = action.payload;
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
        const { buildCvId, initial } = action.payload;

        // Store minimal API reference data
        state.buildCvId = buildCvId;
        state.currentStep = initial?.step || 1;
        state.templateId = initial?.templateId || 1;
        state.initialized = true;
        state.isLoading = false;

        // Directly adapt from the API model to our app model (no adapter needed)
        if (initial) {
          // Personal Info
          const personalInfo: Partial<PersonalInfo> = {
            firstName: initial.personalInfo?.firstName || '',
            lastName: initial.personalInfo?.lastName || '',
            email: initial.personalInfo?.email || '',
            phone: initial.personalInfo?.phone || '',
            city: initial.personalInfo?.city || '',
            country: initial.personalInfo?.country || '',
            title: initial.careerObjective?.position || '',
          };
          
          // Skills
          const skills: Skill[] = (initial.careerObjective?.skillSet || []).map((skill, index) => ({
            id: `skill-${index}`,
            name: skill,
            level: 'intermediate',
          }));
          
          // Work Experience
          const workExperience: WorkExperience[] = (initial.experience?.workPlaces || []).map(wp => ({
            id: wp.id || `exp-${Math.random().toString(36).substring(2, 9)}`,
            company: wp.company || '',
            position: wp.position || '',
            startYear: wp.startYear || '',
            endYear: wp.isStillWorking ? null : (wp.endYear || ''),
            description: wp.responsibilities || '',
            isCurrent: wp.isStillWorking || false,
          }));
          
          // Education
          const education: Education[] = (initial.education?.educationPlaces || []).map(edu => ({
            id: edu.id || `edu-${Math.random().toString(36).substring(2, 9)}`,
            school: edu.nameOfInstitution || '',
            degree: edu.educationLevel || '',
            field: edu.specialty || '',
            startYear: edu.admissionYear || '',
            endYear: edu.graduationYear || null,
            isCurrent: false,
          }));
          
          // Update state with adapted data
          state.personalInfo = personalInfo;
          state.summary = initial.summary?.summary || '';
          state.skills = skills;
          state.education = education;
          state.workExperience = workExperience;
        }
      })
      .addCase(initCvBuilder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle createCv actions
      .addCase(createCv.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCv.fulfilled, (state) => {
        state.isLoading = false;
        // No need to store anything here as we're just confirming the CV was created
      })
      .addCase(createCv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle getAiSuggestion actions
      .addCase(getAiSuggestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAiSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastSuggestedContent = action.payload.content;
        // The component will handle accepting the suggestion
      })
      .addCase(getAiSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  updateSummary,
  updateConsent,
  setTemplateId,
  setSuggestingSection,
  resetCvBuilder,
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;
