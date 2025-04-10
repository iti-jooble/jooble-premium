import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  ICVBuilderInitResponse,
  ICvJsonModelApi,
  IPersonalInfoApi,
  IWorkPlaceApi,
  IEducationPlaceApi,
  ILanguageApi,
  ICareerObjectiveApi,
  CvSource
} from '../../types/api/cvBuilder.types';

interface CvBuilderState {
  initialized: boolean;
  buildCvId: string | null;
  currentStep: number;
  cvData: ICvJsonModelApi | null;
  isLoading: boolean;
  error: string | null;
  templateId: number;
  html: string;
  css: string;
}

const initialState: CvBuilderState = {
  initialized: false,
  buildCvId: null,
  currentStep: 1,
  cvData: null,
  isLoading: false,
  error: null,
  templateId: 1, // Default template ID
  html: '',
  css: ''
};

const cvBuilderSlice = createSlice({
  name: 'cvBuilder',
  initialState,
  reducers: {
    // Initialize CV builder with data from API
    initializeBuilder: (state, action: PayloadAction<ICVBuilderInitResponse>) => {
      const { initial, buildCvId } = action.payload;
      state.cvData = initial;
      state.buildCvId = buildCvId;
      state.currentStep = initial.step;
      state.templateId = initial.templateId;
      state.initialized = true;
    },
    
    // Update the current step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      if (state.cvData) {
        state.currentStep = action.payload;
        state.cvData.step = action.payload;
      }
    },
    
    // Update personal information
    updatePersonalInfo: (state, action: PayloadAction<Partial<IPersonalInfoApi>>) => {
      if (state.cvData) {
        state.cvData.personalInfo = {
          ...state.cvData.personalInfo,
          ...action.payload
        };
      }
    },
    
    // Update career objective
    updateCareerObjective: (state, action: PayloadAction<Partial<ICareerObjectiveApi>>) => {
      if (state.cvData) {
        state.cvData.careerObjective = {
          ...state.cvData.careerObjective,
          ...action.payload
        };
      }
    },
    
    // Add a work place
    addWorkPlace: (state, action: PayloadAction<IWorkPlaceApi>) => {
      if (state.cvData) {
        state.cvData.experience.workPlaces.push(action.payload);
        state.cvData.experience.hasExperience = true;
      }
    },
    
    // Update a work place
    updateWorkPlace: (state, action: PayloadAction<{ id: string; workPlace: Partial<IWorkPlaceApi> }>) => {
      if (state.cvData) {
        const index = state.cvData.experience.workPlaces.findIndex(
          wp => wp.id === action.payload.id
        );
        if (index !== -1) {
          state.cvData.experience.workPlaces[index] = {
            ...state.cvData.experience.workPlaces[index],
            ...action.payload.workPlace
          };
        }
      }
    },
    
    // Remove a work place
    removeWorkPlace: (state, action: PayloadAction<string>) => {
      if (state.cvData) {
        state.cvData.experience.workPlaces = state.cvData.experience.workPlaces.filter(
          wp => wp.id !== action.payload
        );
        if (state.cvData.experience.workPlaces.length === 0) {
          state.cvData.experience.hasExperience = false;
        }
      }
    },
    
    // Update professional skills
    updateProfessionalSkills: (state, action: PayloadAction<string>) => {
      if (state.cvData) {
        state.cvData.experience.professionalSkills = action.payload;
      }
    },
    
    // Add an education place
    addEducationPlace: (state, action: PayloadAction<IEducationPlaceApi>) => {
      if (state.cvData) {
        state.cvData.education.educationPlaces.push(action.payload);
        state.cvData.education.hasEducation = true;
      }
    },
    
    // Update an education place
    updateEducationPlace: (state, action: PayloadAction<{ id: string; educationPlace: Partial<IEducationPlaceApi> }>) => {
      if (state.cvData) {
        const index = state.cvData.education.educationPlaces.findIndex(
          ep => ep.id === action.payload.id
        );
        if (index !== -1) {
          state.cvData.education.educationPlaces[index] = {
            ...state.cvData.education.educationPlaces[index],
            ...action.payload.educationPlace
          };
        }
      }
    },
    
    // Remove an education place
    removeEducationPlace: (state, action: PayloadAction<string>) => {
      if (state.cvData) {
        state.cvData.education.educationPlaces = state.cvData.education.educationPlaces.filter(
          ep => ep.id !== action.payload
        );
        if (state.cvData.education.educationPlaces.length === 0) {
          state.cvData.education.hasEducation = false;
        }
      }
    },
    
    // Update language skills
    updateLanguages: (state, action: PayloadAction<ILanguageApi[]>) => {
      if (state.cvData) {
        state.cvData.languages = action.payload;
      }
    },
    
    // Update summary
    updateSummary: (state, action: PayloadAction<{ summary: string | null }>) => {
      if (state.cvData) {
        state.cvData.summary = action.payload.summary;
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
      if (state.cvData) {
        state.cvData.templateId = action.payload;
        state.templateId = action.payload;
      }
    },
    
    // Update HTML and CSS for the CV
    updateHtmlAndCss: (state, action: PayloadAction<{ html: string; css: string }>) => {
      state.html = action.payload.html;
      state.css = action.payload.css;
    },
    
    // Reset the CV builder state
    resetCvBuilder: () => initialState
  }
});

export const {
  initializeBuilder,
  setCurrentStep,
  updatePersonalInfo,
  updateCareerObjective,
  addWorkPlace,
  updateWorkPlace,
  removeWorkPlace,
  updateProfessionalSkills,
  addEducationPlace,
  updateEducationPlace,
  removeEducationPlace,
  updateLanguages,
  updateSummary,
  updateConsent,
  setTemplateId,
  updateHtmlAndCss,
  resetCvBuilder
} = cvBuilderSlice.actions;

export default cvBuilderSlice.reducer;