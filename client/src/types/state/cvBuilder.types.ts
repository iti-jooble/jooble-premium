// Basic types for our CV builder
export interface PersonalInfo {
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

export interface Skill {
  id: string;
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

export interface CV {
  id: string;
  title: string;
  score: number;
  dateCreated: string;
  personalInfo: Partial<PersonalInfo>;
  summary?: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  templateId: number;
}

// CV template types
export interface CVTemplate {
  id: number;
  name: string;
  previewImage: string;
  isPremium: boolean;
}

// CV builder state types
export interface CVBuilderState {
  currentCV: CV | null;
  isEditing: boolean;
  currentSection: string;
  isSaving: boolean;
  errors: Record<string, string>;
  isDirty: boolean;
}

// AI feature types
export interface AISkillSuggestion {
  skill: string;
  relevance: number;
  description: string;
}

export interface AISummaryRequest {
  experience: WorkExperience[];
  skills: Skill[];
  targetPosition?: string;
}

export interface AIRecommendation {
  type: "skill" | "summary" | "workExperience" | "education";
  content: string;
  score: number;
  reason: string;
}
