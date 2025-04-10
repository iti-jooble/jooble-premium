/**
 * Types for the CV Builder state slice
 */

/**
 * Interface defining a user's personal information
 */
export interface PersonalInfo {
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

/**
 * Interface defining a skill
 */
export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

/**
 * Interface defining an education entry
 */
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

/**
 * Interface defining a work experience entry
 */
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startYear: string;
  endYear: string | null;
  description: string;
  isCurrent: boolean;
}

/**
 * Interface defining a CV
 */
export interface CV {
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

/**
 * Interface defining a CV template
 */
export interface CvTemplate {
  id: string;
  name: string;
  thumbnail: string;
}

/**
 * Interface defining the CV Builder state in Redux
 */
export interface CvBuilderState {
  cvs: CV[];
  activeCvId: string | null;
  isEditing: boolean;
  activeSectionId: string | null;
  templates: CvTemplate[];
  selectedTemplateId: string;
  isSaving: boolean;
  saveError: string | null;
}