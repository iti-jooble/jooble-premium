import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "@/lib/queryClient";

export interface AppInitData {
  userInfo: number;
  configs: {
    paywall: {
      prices: Array<{
        priceId: string;
        name: string;
        description: string;
        amount: number;
        currency: string;
        interval: string;
      }>;
    };
  };
}

interface AppLoadingState {
  isInitialLoading: boolean;
  isInitialRequestComplete: boolean;
  initialRequestError: Error | null;
  initData: AppInitData | null;
}

const initialState: AppLoadingState = {
  isInitialLoading: true,
  isInitialRequestComplete: false,
  initialRequestError: null,
  initData: null,
};

export const appLoadingSlice = createSlice({
  name: "appLoading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isInitialLoading = action.payload;
    },
    setInitialRequestComplete: (state, action: PayloadAction<boolean>) => {
      state.isInitialRequestComplete = action.payload;
    },
    setInitialRequestError: (state, action: PayloadAction<Error | null>) => {
      state.initialRequestError = action.payload;
    },
    setInitData: (state, action: PayloadAction<AppInitData | null>) => {
      state.initData = action.payload;
    },
  },
});

// Action creators
export const {
  setLoading,
  setInitialRequestComplete,
  setInitialRequestError,
  setInitData,
} = appLoadingSlice.actions;

// Thunk for loading initial data
export const loadInitialData = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  dispatch(setInitialRequestError(null));

  try {
    const response = await apiRequest("POST", "/api/init");
    const data = await response.json();
    dispatch(setInitData(data));
    dispatch(setInitialRequestComplete(true));
  } catch (error) {
    dispatch(setInitialRequestError(error as Error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default appLoadingSlice.reducer;
