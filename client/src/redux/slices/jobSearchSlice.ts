import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  JobSearchState,
  Job,
  JobFilter,
  JobSearchParams
} from '../../types/state/jobSearch.types';

// Initial state
const initialState: JobSearchState = {
  jobs: [],
  selectedJobId: null,
  loading: false,
  error: null,
  searchParams: {
    keywords: '',
    location: '',
  },
  filters: {
    jobType: [],
    datePosted: '',
    salaryRange: null,
    experienceLevel: [],
  },
  savedJobs: [],
  totalResults: 0,
  currentPage: 1,
  resultsPerPage: 10,
  hasMoreResults: false,
};

// Create the slice
const jobSearchSlice = createSlice({
  name: 'jobSearch',
  initialState,
  reducers: {
    // Set job listings
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    
    // Add new jobs (for infinite scrolling/pagination)
    appendJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = [...state.jobs, ...action.payload];
    },
    
    // Set selected job
    setSelectedJob: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload;
    },
    
    // Update search parameters
    setSearchParams: (state, action: PayloadAction<{ keywords?: string; location?: string }>) => {
      state.searchParams = {
        ...state.searchParams,
        ...action.payload
      };
      // Reset pagination when search params change
      state.currentPage = 1;
    },
    
    // Update filters
    setFilters: (state, action: PayloadAction<Partial<JobFilter>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
      // Reset pagination when filters change
      state.currentPage = 1;
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filters = {
        jobType: [],
        datePosted: '',
        salaryRange: null,
        experienceLevel: [],
      };
      // Reset pagination when filters change
      state.currentPage = 1;
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Toggle saved job
    toggleSavedJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      
      if (state.savedJobs.includes(jobId)) {
        state.savedJobs = state.savedJobs.filter(id => id !== jobId);
        
        // Also update the job in the listing if it exists
        const jobIndex = state.jobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isSaved = false;
        }
      } else {
        state.savedJobs.push(jobId);
        
        // Also update the job in the listing if it exists
        const jobIndex = state.jobs.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isSaved = true;
        }
      }
    },
    
    // Set saved jobs
    setSavedJobs: (state, action: PayloadAction<string[]>) => {
      state.savedJobs = action.payload;
      
      // Update all jobs in the listing
      state.jobs.forEach(job => {
        job.isSaved = state.savedJobs.includes(job.id);
      });
    },
    
    // Set pagination information
    setPaginationInfo: (state, action: PayloadAction<{
      totalResults: number;
      currentPage: number;
      resultsPerPage: number;
      hasMoreResults: boolean;
    }>) => {
      const { totalResults, currentPage, resultsPerPage, hasMoreResults } = action.payload;
      state.totalResults = totalResults;
      state.currentPage = currentPage;
      state.resultsPerPage = resultsPerPage;
      state.hasMoreResults = hasMoreResults;
    },
    
    // Load more results (pagination)
    loadMoreResults: (state) => {
      state.currentPage += 1;
    },
    
    // Reset search and filters
    resetSearch: (state) => {
      state.searchParams = {
        keywords: '',
        location: '',
      };
      state.filters = {
        jobType: [],
        datePosted: '',
        salaryRange: null,
        experienceLevel: [],
      };
      state.currentPage = 1;
    },
  },
});

// Export actions
export const {
  setJobs,
  appendJobs,
  setSelectedJob,
  setSearchParams,
  setFilters,
  resetFilters,
  setLoading,
  setError,
  toggleSavedJob,
  setSavedJobs,
  setPaginationInfo,
  loadMoreResults,
  resetSearch,
} = jobSearchSlice.actions;

// Export reducer
export default jobSearchSlice.reducer;