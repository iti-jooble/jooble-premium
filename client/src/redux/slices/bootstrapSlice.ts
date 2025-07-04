import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BootstrapConfigs,
  BootstrapState,
} from "@/types/state/bootstrap.types";
import { runBootstrap } from "@/redux/thunks";

const initialState: BootstrapState = {
  isLoading: true,
  error: null,
  configs: {
    google: {
      clientId:
        "89713733914-4d6g2mqk6sop13c9ipthtktv7d19lbti.apps.googleusercontent.com",
      apiKey: "",
    },
  },
};

export const bootstrapSlice = createSlice({
  name: "bootstrap",
  initialState,
  selectors: {
    getConfigsSelector: (state) => state.configs,
    getBootstrapStateSelector: (state) => ({
      isLoading: state.isLoading,
      error: state.error,
    }),
    getPayWallConfigsSelector: (state) => state.configs.paywall,
  },
  reducers: {
    setBotstrapLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setBotstrapError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setBotstrapConfigs: (state, action: PayloadAction<BootstrapConfigs>) => {
      state.configs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runBootstrap.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(runBootstrap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.configs = {
          ...state.configs,
          ...action.payload,
        };
      })
      .addCase(runBootstrap.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message as string;
      });
  },
});

export const { setBotstrapLoading, setBotstrapError, setBotstrapConfigs } =
  bootstrapSlice.actions;

export const selectors = bootstrapSlice.selectors;

export default bootstrapSlice.reducer;
