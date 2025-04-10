import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers
import userReducer from './slices/userSlice';
import cvBuilderReducer from './slices/cvBuilderSlice';
import jobSearchReducer from './slices/jobSearchSlice';
import uiReducer from './slices/uiSlice';

// Import API slices
import { 
  apiSlice, 
  cvApi, 
  jobApi, 
  authApi, 
  coverLetterApi 
} from './api/apiSlice';

// Configure store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cvBuilder: cvBuilderReducer,
    jobSearch: jobSearchReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [cvApi.reducerPath]: cvApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [coverLetterApi.reducerPath]: coverLetterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for non-serializable values like functions
    }).concat(
      apiSlice.middleware,
      cvApi.middleware,
      jobApi.middleware,
      authApi.middleware,
      coverLetterApi.middleware
    ),
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;