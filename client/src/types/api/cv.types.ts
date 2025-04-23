/**
 * Types for the CV API
 */
import { CV, PersonalInfo, Education, Skill, experience } from '../state/cvBuilder.types';

/**
 * Interface for get CVs response
 */
export interface GetCVsResponse {
  cvs: CV[];
  total: number;
}

/**
 * Interface for get CV response
 */
export interface GetCVResponse {
  cv: CV;
}

/**
 * Interface for create CV request
 */
export interface CreateCVRequest {
  title: string;
  personalInfo?: Partial<PersonalInfo>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  experience?: experience[];
}

/**
 * Interface for update CV request
 */
export interface UpdateCVRequest {
  id: string;
  title?: string;
  personalInfo?: Partial<PersonalInfo>;
  summary?: string;
  skills?: Skill[];
  education?: Education[];
  experience?: experience[];
}

/**
 * Interface for delete CV response
 */
export interface DeleteCVResponse {
  success: boolean;
  id: string;
}

/**
 * Interface for grade CV response
 */
export interface GradeCVResponse {
  score: number;
  feedback: string;
}