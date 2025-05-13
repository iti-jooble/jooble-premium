import { createAsyncThunk } from "@reduxjs/toolkit";
import { bootstrapApiSlice } from "../api/bootstrapApiSlice";
import { setUser } from "../slices/userSlice";
import { BootstrapConfigs } from "@/types/state/bootstrap.types";
import { tryUpdatePreferencesFromLocalStorage } from "./user.thunks";

export const runBootstrap = createAsyncThunk<BootstrapConfigs, void>(
  "bootstrap/runBootstrap",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        bootstrapApiSlice.endpoints.init.initiate(),
      );

      if (!response.data) {
        throw new Error("Failed to initialize application");
      }

      dispatch(setUser(response.data.user));

      if (!response.data.user.preferences) {
        dispatch(tryUpdatePreferencesFromLocalStorage());
      }

      return response.data.configs;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
