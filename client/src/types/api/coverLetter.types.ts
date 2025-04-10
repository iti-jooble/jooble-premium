/**
 * Types for the Cover Letter API
 */

/**
 * Interface defining a cover letter
 */
export interface CoverLetter {
  id: string;
  title: string;
  content: string;
  dateCreated: string;
  lastModified: string;
  jobId?: string;
  cvId?: string;
}

/**
 * Interface for cover letter list response
 */
export interface CoverLetterListResponse {
  coverLetters: CoverLetter[];
  total: number;
}

/**
 * Interface for create cover letter request
 */
export interface CreateCoverLetterRequest {
  title: string;
  content?: string;
  jobId?: string;
  cvId?: string;
}

/**
 * Interface for update cover letter request
 */
export interface UpdateCoverLetterRequest {
  id: string;
  title?: string;
  content?: string;
}

/**
 * Interface for generate cover letter request
 */
export interface GenerateCoverLetterRequest {
  cvId: string;
  jobId?: string;
  jobDescription?: string;
  companyName?: string;
  additionalInfo?: string;
}

/**
 * Interface for delete cover letter response
 */
export interface DeleteCoverLetterResponse {
  success: boolean;
  id: string;
}

/**
 * Interface for improve cover letter request
 */
export interface ImproveCoverLetterRequest {
  id: string;
  suggestions?: string;
}