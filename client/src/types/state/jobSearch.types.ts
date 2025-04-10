/**
 * Types for the Job Search state slice
 */

/**
 * Interface defining a job
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  isNew?: boolean;
  isSaved?: boolean;
  matchScore?: number;
}

/**
 * Interface defining job search filters
 */
export interface JobFilter {
  jobType?: string[];
  datePosted?: string;
  salaryRange?: [number, number] | null;
  experienceLevel?: string[];
  keywords?: string;
  location?: string;
}

/**
 * Interface defining search parameters
 */
export interface JobSearchParams {
  keywords: string;
  location: string;
}

/**
 * Interface defining the Job Search state in Redux
 */
export interface JobSearchState {
  jobs: Job[];
  selectedJobId: string | null;
  loading: boolean;
  error: string | null;
  searchParams: JobSearchParams;
  filters: JobFilter;
  savedJobs: string[]; // Array of job IDs
  totalResults: number;
  currentPage: number;
  resultsPerPage: number;
  hasMoreResults: boolean;
}