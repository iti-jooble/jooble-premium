import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobSearchState } from "../../types/state/jobSearch.types";
import { Job } from "@shared/schema";
import { refreshJobs, initJobs, loadMore, getJobByUidAsync } from "../thunks";

const initialState: JobSearchState = {
  jobs: [],
  selectedJobId: null,
  isLoadingSelectedJob: false,
  isInitialized: false,
  isLoading: false,
  error: null,
  totalJobsCount: 0,
  currentPage: 1,
  resultsPerPage: 10,
  hasMore: false,
};

const jobSearchSlice = createSlice({
  name: "jobSearch",
  initialState,
  selectors: {
    getSelectedJobSelector: (state) =>
      state.jobs.find((job) => job.uid === state.selectedJobId),
    getJobsSelector: (state) => state.jobs,
    getTotalJobsCountSelector: (state) => state.totalJobsCount,
    getJobSearchState: (state) => ({
      isLoading: state.isLoading,
      isInitialized: state.isInitialized,
      error: state.error,
    }),
    isLoadingSelector: (state) => state.isLoading,
    isInitializedSelector: (state) => state.isInitialized,
    isLoadingSelectedJobSelector: (state) => state.isLoadingSelectedJob,
    getCurrentPageSelector: (state) => state.currentPage,
  },
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },

    appendJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = [...state.jobs, ...action.payload];
    },

    setSelectedJob: (state, action: PayloadAction<string | null>) => {
      state.selectedJobId = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setPaginationInfo: (
      state,
      action: PayloadAction<{
        totalJobsCount: number;
        currentPage: number;
        resultsPerPage: number;
        hasMoreResults: boolean;
      }>,
    ) => {
      const { totalJobsCount, currentPage, resultsPerPage, hasMoreResults } =
        action.payload;
      state.totalJobsCount = totalJobsCount;
      state.currentPage = currentPage;
      state.resultsPerPage = resultsPerPage;
      state.hasMore = hasMoreResults;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    resetSearch: (state) => {
      state.isInitialized = false;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshJobs.fulfilled, (state, action) => {
      state.jobs = action.payload.jobs;
      state.hasMore = action.payload.hasMore;
      state.totalJobsCount = action.payload.totalJobsCount;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(refreshJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(loadMore.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadMore.fulfilled, (state, action) => {
      state.jobs = [...state.jobs, ...action.payload.jobs];
      state.hasMore = action.payload.hasMore;
      state.totalJobsCount = action.payload.totalJobsCount;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loadMore.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || null;
    });

    builder.addCase(getJobByUidAsync.pending, (state) => {
      state.isLoadingSelectedJob = true;
      state.error = null;
    });
    builder.addCase(getJobByUidAsync.fulfilled, (state, action) => {
      const existingJobIndex = state.jobs.findIndex(
        (job) => job.uid === action.payload.uid,
      );

      if (existingJobIndex !== -1) {
        state.jobs[existingJobIndex] = action.payload;
      } else {
        state.jobs.push(action.payload);
      }

      state.isLoadingSelectedJob = false;
      state.error = null;
    });
    builder.addCase(getJobByUidAsync.rejected, (state, action) => {
      state.isLoadingSelectedJob = false;
      state.error = action.error.message || null;
    });

    builder.addCase(initJobs.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});

export const selectors = jobSearchSlice.selectors;

export const {
  setJobs,
  appendJobs,
  setSelectedJob,
  setLoading,
  setError,
  setPaginationInfo,
  setCurrentPage,
  resetSearch,
} = jobSearchSlice.actions;

export default jobSearchSlice.reducer;
