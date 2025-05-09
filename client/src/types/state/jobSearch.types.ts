/**
 * Types for the Job Search state slice
 */
import { Job } from "@shared/schema";

/**
 * Interface defining the Job Search state in Redux
 */
export interface JobSearchState {
  jobs: Job[];
  selectedJobId: string | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  totalJobsCount: number;
  currentPage: number;
  resultsPerPage: number;
  hasMore: boolean;
}
