/**
 * Types for the Job API
 */
import { Job } from '../state/jobSearch.types';

/**
 * Interface for get jobs response
 */
export interface GetJobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  hasMore: boolean;
}

/**
 * Interface for get job response
 */
export interface GetJobResponse {
  job: Job;
}

/**
 * Interface for search jobs request
 */
export interface SearchJobsRequest {
  keywords?: string;
  location?: string;
  page?: number;
  limit?: number;
  jobType?: string[];
  datePosted?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string[];
}

/**
 * Interface for saved job response
 */
export interface SavedJobResponse {
  success: boolean;
  jobId: string;
}

/**
 * Interface for match CV response
 */
export interface MatchCVResponse {
  jobId: string;
  cvId: string;
  matchScore: number;
  matchDetails: {
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    overallMatch: number;
  };
  improvementSuggestions: string[];
}

/**
 * Interface for generate job tips request
 */
export interface GenerateJobTipsRequest {
  cvId: string;
  jobId: string;
}

/**
 * Interface for generate job tips response
 */
export interface GenerateJobTipsResponse {
  tips: string[];
}