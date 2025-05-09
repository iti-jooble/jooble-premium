/**
 * Types for the Job API
 */
import { Job } from "@shared/schema";

/**
 * Interface for get jobs response
 */
export interface SearchJobsResponse {
  jobs: Job[];
  totalJobsCount: number;
  hasMore: boolean;
}

/**
 * Interface for get job response
 */
export interface GetJobResponse {
  job: Job;
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
