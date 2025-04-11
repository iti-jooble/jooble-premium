import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import reducers
import userReducer from "./slices/userSlice";
import cvBuilderReducer from "./slices/cvBuilderSlice";
import jobSearchReducer from "./slices/jobSearchSlice";
import uiReducer from "./slices/uiSlice";

// Import API slices
import { apiSlice } from "./api/apiSlice";
import { cvApiSlice } from "./api/cvApiSlice";
import { jobApi } from "./api/jobApiSlice";
import { authApi } from "./api/authApiSlice";
import { coverLetterApi } from "./api/coverLetterApiSlice";
import { cvBuilderApiSlice } from "./api/cvBuilderApiSlice";

// Configure store
export const store = configureStore({
  reducer: {
    // Feature reducers
    user: userReducer,
    cvBuilder: cvBuilderReducer,
    jobSearch: jobSearchReducer,
    ui: uiReducer,

    // API reducers - each API slice has a unique reducerPath
    [apiSlice.reducerPath]: apiSlice.reducer,
    [cvApiSlice.reducerPath]: cvApiSlice.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [coverLetterApi.reducerPath]: coverLetterApi.reducer,

    // Custom endpoints injected into apiSlice use the same reducerPath
    // This is handled automatically by RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for non-serializable values like functions
    }).concat(
      apiSlice.middleware,
      cvApiSlice.middleware,
      jobApi.middleware,
      authApi.middleware,
      coverLetterApi.middleware,
      cvBuilderApiSlice.middleware,
    ),
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
