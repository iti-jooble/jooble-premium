import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { 
  ICVBuilderInitResponse,
  ICvJsonModelApi,
  IPersonalInfoApi,
  IWorkPlaceApi,
  IEducationPlaceApi,
  ILanguageApi,
  ICareerObjectiveApi,
  CvSource,
  ICreateCvRequest,
  ICreateCvResponse,
  IPromptConfigApi,
  IAISuggestResponse
} from '../../types/api/cvBuilder.types';

import { 
  PersonalInfo, 
  WorkExperience, 
  Education, 
  Skill, 
  CV,
  CVTemplate
} from '../../types/state/cvBuilder.types';

import { 
  convertFromCvJsonModel, 
  convertToCvJsonModel,
  convertWorkExperienceToApi,
  convertEducationToApi,
  convertPersonalInfoToApi
} from '../../adapters/cvBuilderAdapter';

// API base URL for CV builder
const API_BASE_URL = '/api';

// Define AsyncThunk for initializing CV builder
export const initCvBuilder = createAsyncThunk(
  'cvBuilder/initCvBuilder',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cvbuilder/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to initialize CV builder');
      }

      const data: ICVBuilderInitResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define AsyncThunk for creating a CV
export const createCv = createAsyncThunk(
  'cvBuilder/createCv',
  async (payload: {
    html: string;
    css: string;
  }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cvBuilder: CvBuilderState };
      const { cvData, buildCvId } = state.cvBuilder;
      const { html, css } = payload;

      if (!cvData || !buildCvId) {
        throw new Error('CV data or build ID not available');
      }

      const request: ICreateCvRequest = {
        buildCvId,
        source: cvData.source,
        json: cvData,
        jdpId: cvData.jdpId,
        step: cvData.step,
        html,
        css
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/createV2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Failed to create CV');
      }

      const data: ICreateCvResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define AsyncThunk for getting AI suggestions
export const getAiSuggestion = createAsyncThunk(
  'cvBuilder/getAiSuggestion',
  async (payload: {
    type: string;
    userContent: string;
    systemReplacements?: Record<string, string>;
  }, { rejectWithValue }) => {
    try {
      const promptConfig: IPromptConfigApi = {
        type: payload.type,
        userReplacements: {
          content: payload.userContent
        },
        systemReplacements: payload.systemReplacements || {}
      };

      const response = await fetch(`${API_BASE_URL}/cvbuilder/suggestv2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(promptConfig)
      });

      if (!response.ok) {
        throw new Error('Failed to get AI suggestion');
      }

      const data: IAISuggestResponse = await response.json();
      return {
        type: payload.type,
        content: data.content
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define our state interface
interface CvBuilderState {
  // API data
  buildCvId: string | null;
  cvData: ICvJsonModelApi | null;
  
  // UI state data
  initialized: boolean;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  templateId: number;
  html: string;
  css: string;
  
  // Adapted app model
  currentCV: {
    personalInfo: Partial<PersonalInfo>;
    summary?: string;
    skills: Skill[];
    education: Education[];
    workExperience: WorkExperience[];
  } | null;
  
  // UI related
  availableTemplates: CVTemplate[];
  lastSuggestedContent: string | null;
  suggestingSection: string | null;
  suggestingContentFor: string | null;
}

const initialState: CvBuilderState = {
  // API data
  buildCvId: null,
  cvData: null,
  
  // UI state
  initialized: false,
  currentStep: 1,
  isLoading: false,
  error: null,
  templateId: 1,
  html: '',
  css: '',
  
  // Adapted app model
  currentCV: null,
  
  // UI related
  availableTemplates: [
    {
      id: 1,
      name: 'Professional',
      previewImage: '/templates/template1.png',
      isPremium: false
    },
    {
      id: 2,
      name: 'Modern',
      previewImage: '/templates/template2.png',
      isPremium: false
    },
    {
      id: 3,
      name: 'Creative',
      previewImage: '/templates/template3.png',
      isPremium: true
    }
  ],
  lastSuggestedContent: null,
  suggestingSection: null,
  suggestingContentFor: null
};

const cvBuilderSlice = createSlice({
  name: 'cvBuilder',
  initialState,
  reducers: {
    // Update the current step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      if (state.cvData) {
        state.cvData.step = action.payload;
      }
    },
    
    // Update personal information in both API model and app model
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      // Update app model
      if (state.currentCV) {
        state.currentCV.personalInfo = {
          ...state.currentCV.personalInfo,
          ...action.payload
        };
      }
      
      // Update API model
      if (state.cvData) {
        state.cvData.personalInfo = {
          ...state.cvData.personalInfo,
          ...convertPersonalInfoToApi(action.payload)
        };
        
        // If there's a job title in personal info, update career objective position
        if (action.payload.title) {
          state.cvData.careerObjective.position = action.payload.title;
        }
      }
    },
    
    // Update work experience
    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      // Update app model
      if (state.currentCV) {
        state.currentCV.workExperience = action.payload;
      }
      
      // Update API model
      if (state.cvData) {
        state.cvData.experience.workPlaces = action.payload.map(convertWorkExperienceToApi);
        state.cvData.experience.hasExperience = action.payload.length > 0;
      }
    },
    
    // Update education
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      // Update app model
      if (state.currentCV) {
        state.currentCV.education = action.payload;
      }
      
      // Update API model
      if (state.cvData) {
        state.cvData.education.educationPlaces = action.payload.map(convertEducationToApi);
        state.cvData.education.hasEducation = action.payload.length > 0;
      }
    },
    
    // Update skills
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      // Update app model
      if (state.currentCV) {
        state.currentCV.skills = action.payload;
      }
      
      // Update API model
      if (state.cvData) {
        // Update skills string and skill set in career objective
        const skillsString = action.payload.map(skill => skill.name).join(', ');
        const skillSet = action.payload.map(skill => skill.name);
        
        state.cvData.careerObjective.skills = skillsString;
        state.cvData.careerObjective.skillSet = skillSet;
        state.cvData.experience.professionalSkills = skillsString;
      }
    },
    
    // Update summary
    updateSummary: (state, action: PayloadAction<string>) => {
      // Update app model
      if (state.currentCV) {
        state.currentCV.summary = action.payload;
      }
      
      // Update API model
      if (state.cvData) {
        state.cvData.summary = action.payload;
      }
    },
    
    // Update consent preferences
    updateConsent: (state, action: PayloadAction<{ 
      recommendJobsByCVConsent?: boolean; 
      sendCVImprovementTipsConsent?: boolean 
    }>) => {
      if (state.cvData) {
        if (action.payload.recommendJobsByCVConsent !== undefined) {
          state.cvData.recommendJobsByCVConsent = action.payload.recommendJobsByCVConsent;
        }
        if (action.payload.sendCVImprovementTipsConsent !== undefined) {
          state.cvData.sendCVImprovementTipsConsent = action.payload.sendCVImprovementTipsConsent;
        }
      }
    },
    
    // Update template ID
    setTemplateId: (state, action: PayloadAction<number>) => {
      state.templateId = action.payload;
      if (state.cvData) {
        state.cvData.templateId = action.payload;
      }
    },
    
    // Update HTML and CSS for the CV
    updateHtmlAndCss: (state, action: PayloadAction<{ html: string; css: string }>) => {
      state.html = action.payload.html;
      state.css = action.payload.css;
    },
    
    // Update the section being suggested by AI
    setSuggestingSection: (state, action: PayloadAction<string | null>) => {
      state.suggestingSection = action.payload;
    },
    
    // Update the content being suggested for (e.g., summary, skill, etc.)
    setSuggestingContentFor: (state, action: PayloadAction<string | null>) => {
      state.suggestingContentFor = action.payload;
    },
    
    // Reset the CV builder state
    resetCvBuilder: () => initialState
  },
  extraReducers: (builder) => {
    // Handle initCvBuilder actions
    builder
      .addCase(initCvBuilder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initCvBuilder.fulfilled, (state, action) => {
        const { initial, buildCvId } = action.payload;
        
        // Update API data
        state.cvData = initial;
        state.buildCvId = buildCvId;
        state.currentStep = initial.step;
        state.templateId = initial.templateId;
        state.initialized = true;
        state.isLoading = false;
        
        // Adapt API model to our app model
        const adaptedData = convertFromCvJsonModel(initial);
        
        // Set app model
        state.currentCV = {
          personalInfo: adaptedData.personalInfo,
          summary: adaptedData.summary,
          skills: adaptedData.skills || [],
          education: adaptedData.education || [],
          workExperience: adaptedData.workExperience || []
        };
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
        // You might want to store the CV ID or other response data
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
        
        // Automatically update the appropriate section with the AI suggestion if needed
        // The component will handle accepting the suggestion now
      })
      .addCase(getAiSuggestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
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
  updateHtmlAndCss,
  setSuggestingSection,
  setSuggestingContentFor,
  resetCvBuilder
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;