import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConfigState, IConfig } from "../../types/state/config.types";

const initialState: IConfigState = {
  isLoading: false,
  error: null,
  configs: {},
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Set a single config
    setConfig: (state, action: PayloadAction<IConfig>) => {
      state.configs[action.payload.key] = action.payload.value;
    },

    // Set multiple configs
    setConfigs: (state, action: PayloadAction<IConfig[]>) => {
      action.payload.forEach((config) => {
        state.configs[config.key] = config.value;
      });
    },

    // Remove a config
    removeConfig: (state, action: PayloadAction<string>) => {
      delete state.configs[action.payload];
    },

    // Clear all configs
    clearConfigs: (state) => {
      state.configs = {};
    },

    // Reset the config state
    resetConfig: () => initialState,
  },
});

export const {
  setLoading,
  setError,
  setConfig,
  setConfigs,
  removeConfig,
  clearConfigs,
  resetConfig,
} = configSlice.actions;

export default configSlice.reducer; 