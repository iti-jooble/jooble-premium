import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Import types from our application
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  title?: string;
  website?: string;
  linkedin?: string;
}

interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

interface CV {
  id: string;
  title: string;
  dateCreated: string;
  lastModified: string;
  templateId: string;
  personalInfo: Partial<PersonalInfo>;
  summary?: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  score?: number;
}

// Define the CV Builder state
interface CvBuilderState {
  cvs: CV[];
  activeCvId: string | null;
  isEditing: boolean;
  activeSectionId: string | null;
  templates: {
    id: string;
    name: string;
    thumbnail: string;
  }[];
  selectedTemplateId: string;
  isSaving: boolean;
  saveError: string | null;
}

// Initial templates
const initialTemplates = [
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/templates/classic.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/templates/modern.png',
  },
  {
    id: 'professional',
    name: 'Professional',
    thumbnail: '/templates/professional.png',
  },
];

// Define initial state
const initialState: CvBuilderState = {
  cvs: [],
  activeCvId: null,
  isEditing: false,
  activeSectionId: null,
  templates: initialTemplates,
  selectedTemplateId: 'classic',
  isSaving: false,
  saveError: null,
};

// Create the slice
const cvBuilderSlice = createSlice({
  name: 'cvBuilder',
  initialState,
  reducers: {
    // Set all CVs
    setCvs: (state, action: PayloadAction<CV[]>) => {
      state.cvs = action.payload;
    },
    
    // Create a new CV
    createCv: (state, action: PayloadAction<Partial<CV>>) => {
      const now = new Date().toISOString();
      const newCv: CV = {
        id: uuidv4(),
        title: action.payload.title || 'Untitled CV',
        dateCreated: now,
        lastModified: now,
        templateId: state.selectedTemplateId,
        personalInfo: action.payload.personalInfo || {},
        summary: action.payload.summary || '',
        skills: action.payload.skills || [],
        education: action.payload.education || [],
        workExperience: action.payload.workExperience || [],
        score: 0,
      };
      
      state.cvs.push(newCv);
      state.activeCvId = newCv.id;
      state.isEditing = true;
    },
    
    // Update an existing CV
    updateCv: (state, action: PayloadAction<{ id: string; data: Partial<CV> }>) => {
      const { id, data } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === id);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex] = {
          ...state.cvs[cvIndex],
          ...data,
          lastModified: new Date().toISOString(),
        };
      }
    },
    
    // Update personal info section
    updatePersonalInfo: (state, action: PayloadAction<{ cvId: string; data: Partial<PersonalInfo> }>) => {
      const { cvId, data } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex].personalInfo = {
          ...state.cvs[cvIndex].personalInfo,
          ...data,
        };
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Update CV summary
    updateSummary: (state, action: PayloadAction<{ cvId: string; summary: string }>) => {
      const { cvId, summary } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex].summary = summary;
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Add a skill
    addSkill: (state, action: PayloadAction<{ cvId: string; skill: Omit<Skill, 'id'> }>) => {
      const { cvId, skill } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        const newSkill = {
          id: uuidv4(),
          ...skill,
        };
        state.cvs[cvIndex].skills.push(newSkill);
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Update skills
    updateSkills: (state, action: PayloadAction<{ cvId: string; skills: Skill[] }>) => {
      const { cvId, skills } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex].skills = skills;
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Add education item
    addEducation: (state, action: PayloadAction<{ cvId: string; education: Omit<Education, 'id'> }>) => {
      const { cvId, education } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        const newEducation = {
          id: uuidv4(),
          ...education,
        };
        state.cvs[cvIndex].education.push(newEducation);
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Update education items
    updateEducation: (state, action: PayloadAction<{ cvId: string; education: Education[] }>) => {
      const { cvId, education } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex].education = education;
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Add work experience
    addWorkExperience: (state, action: PayloadAction<{ cvId: string; experience: Omit<WorkExperience, 'id'> }>) => {
      const { cvId, experience } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        const newExperience = {
          id: uuidv4(),
          ...experience,
        };
        state.cvs[cvIndex].workExperience.push(newExperience);
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Update work experiences
    updateWorkExperience: (state, action: PayloadAction<{ cvId: string; experience: WorkExperience[] }>) => {
      const { cvId, experience } = action.payload;
      const cvIndex = state.cvs.findIndex(cv => cv.id === cvId);
      
      if (cvIndex !== -1) {
        state.cvs[cvIndex].workExperience = experience;
        state.cvs[cvIndex].lastModified = new Date().toISOString();
      }
    },
    
    // Delete CV
    deleteCv: (state, action: PayloadAction<string>) => {
      const cvId = action.payload;
      state.cvs = state.cvs.filter(cv => cv.id !== cvId);
      
      if (state.activeCvId === cvId) {
        state.activeCvId = state.cvs.length > 0 ? state.cvs[0].id : null;
        state.isEditing = false;
      }
    },
    
    // Duplicate CV
    duplicateCv: (state, action: PayloadAction<string>) => {
      const cvId = action.payload;
      const cvToDuplicate = state.cvs.find(cv => cv.id === cvId);
      
      if (cvToDuplicate) {
        const now = new Date().toISOString();
        const duplicatedCv: CV = {
          ...cvToDuplicate,
          id: uuidv4(),
          title: `${cvToDuplicate.title} (Copy)`,
          dateCreated: now,
          lastModified: now,
        };
        
        state.cvs.push(duplicatedCv);
      }
    },
    
    // Set active CV
    setActiveCvId: (state, action: PayloadAction<string>) => {
      state.activeCvId = action.payload;
    },
    
    // Toggle editing mode
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    
    // Set active section
    setActiveSectionId: (state, action: PayloadAction<string | null>) => {
      state.activeSectionId = action.payload;
    },
    
    // Select template
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplateId = action.payload;
      
      // If there's an active CV, update its template too
      if (state.activeCvId) {
        const cvIndex = state.cvs.findIndex(cv => cv.id === state.activeCvId);
        if (cvIndex !== -1) {
          state.cvs[cvIndex].templateId = action.payload;
          state.cvs[cvIndex].lastModified = new Date().toISOString();
        }
      }
    },
    
    // Set saving status
    setSavingStatus: (state, action: PayloadAction<{ isSaving: boolean; error?: string | null }>) => {
      state.isSaving = action.payload.isSaving;
      state.saveError = action.payload.error || null;
    },
  },
});

// Export actions
export const {
  setCvs,
  createCv,
  updateCv,
  updatePersonalInfo,
  updateSummary,
  addSkill,
  updateSkills,
  addEducation,
  updateEducation,
  addWorkExperience,
  updateWorkExperience,
  deleteCv,
  duplicateCv,
  setActiveCvId,
  setIsEditing,
  setActiveSectionId,
  selectTemplate,
  setSavingStatus,
} = cvBuilderSlice.actions;

// Export reducer
export default cvBuilderSlice.reducer;