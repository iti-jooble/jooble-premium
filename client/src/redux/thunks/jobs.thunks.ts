import { createAsyncThunk } from "@reduxjs/toolkit";
import { jobApiSlice } from "../api/jobApiSlice";
import { jobsSelectors } from "../selectors";
import { Job } from "@shared/schema";

type JobSearchResponse = {
  jobs: Job[];
  totalJobsCount: number;
  hasMore: boolean;
};

export const initJobs = createAsyncThunk(
  "jobs/init",
  async (_, { dispatch }) => {
    await dispatch(refreshJobs());
  },
);

export const loadMore = createAsyncThunk<JobSearchResponse, void>(
  "jobs/loadMore",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const currentPage = jobsSelectors.getCurrentPageSelector(getState());
      const result = await dispatch(
        searchJobs({ page: currentPage + 1 }),
      ).unwrap();

      return result;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const refreshJobs = createAsyncThunk<JobSearchResponse, void>(
  "jobs/refresh",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(searchJobs({ page: 1 })).unwrap();

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const searchJobs = createAsyncThunk<
  JobSearchResponse,
  { page: number } | void
>("jobs/search", async (payload, { dispatch }) => {
  try {
    const searchParams = {
      page: {
        number: payload?.page ?? 1,
        size: 20,
      },
    };

    const result = await dispatch(
      jobApiSlice.endpoints.searchJobs.initiate(searchParams, {
        forceRefetch: true,
      }),
    );

    if (!result.data) {
      throw new Error("Failed to search jobs");
    }

    return result.data;
  } catch (error: any) {
    throw error;
  }
});

export const getJobByUidAsync = createAsyncThunk<Job, string>(
  "jobs/getJobByUid",
  async (uid, { dispatch }) => {
    try {
      const result = await dispatch(
        jobApiSlice.endpoints.getJobByUid.initiate(uid),
      );

      if (!result.data) {
        throw new Error("Failed to get job by uid");
      }

      return result.data;
    } catch (error: any) {
      throw error;
    }
  },
);
