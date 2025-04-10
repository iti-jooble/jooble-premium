export interface IPersonalInfo {
  id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  zipCode?: string;
  birthYear?: string;
  title?: string;
  profileImage?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface ISkill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface IEducation {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear: string | null;
  isCurrent: boolean;
}

export interface IWorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

export interface ICv {
  id: string;
  title: string;
  score?: number;
  dateCreated: string;
  personalInfo: Partial<IPersonalInfo>;
  summary?: string;
  skills: ISkill[];
  education: IEducation[];
  workExperience: IWorkExperience[];
  templateId: number;
}

export interface ICVTemplate {
  id: number;
  name: string;
  previewImage: string;
  isPremium: boolean;
}

export interface ICVBuilderState {
  currentCvId: string | null;
  cvList: ICv[];
  isLoading: boolean;
  isInitialized: boolean;
  isEditing: boolean;
  currentSection: string;
  isSaving: boolean;
  error: string | null;
}

export interface IAISkillSuggestion {
  skill: string;
  relevance: number;
  description: string;
}

export interface IAISummaryRequest {
  experience: IWorkExperience[];
  skills: ISkill[];
  targetPosition?: string;
}

export interface IAIRecommendation {
  type: "skill" | "summary" | "workExperience" | "education";
  content: string;
  score: number;
  reason: string;
}
