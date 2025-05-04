import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import reducers
import userReducer from "./slices/userSlice";
import cvBuilderReducer from "./slices/cvBuilderSlice";
import jobSearchReducer from "./slices/jobSearchSlice";
import uiReducer from "./slices/uiSlice";
import bootstrapReducer from "./slices/bootstrapSlice";

// Import API slices
import { cvApiSlice } from "./api/cvApiSlice";
import { jobApi } from "./api/jobApiSlice";
import { authApiSlice } from "./api/authApiSlice";
import { coverLetterApi } from "./api/coverLetterApiSlice";
import { bootstrapApiSlice } from "./api/bootstrapApiSlice";
import { paymentApiSlice } from "./api/paymentApiSlice";

// Configure store
export const store = configureStore({
  reducer: {
    // Feature reducers
    user: userReducer,
    cvBuilder: cvBuilderReducer,
    jobSearch: jobSearchReducer,
    ui: uiReducer,
    bootstrap: bootstrapReducer,

    // API reducers - each API slice has a unique reducerPath
    [cvApiSlice.reducerPath]: cvApiSlice.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [coverLetterApi.reducerPath]: coverLetterApi.reducer,
    [bootstrapApiSlice.reducerPath]: bootstrapApiSlice.reducer,
    [paymentApiSlice.reducerPath]: paymentApiSlice.reducer,

    // Custom endpoints injected into apiSlice use the same reducerPath
    // This is handled automatically by RTK Query
  },
  middleware: (getDefaultMiddleware) => {
    // Start with the default middleware
    const middleware = getDefaultMiddleware({
      serializableCheck: false, // Needed for non-serializable values like functions
    });

    // Create an array of API middleware to add
    const apiMiddleware = [
      cvApiSlice.middleware,
      jobApi.middleware,
      authApiSlice.middleware,
      coverLetterApi.middleware,
      bootstrapApiSlice.middleware,
      paymentApiSlice.middleware,
    ];

    // Return the combined middleware
    return middleware.concat(...apiMiddleware);
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
