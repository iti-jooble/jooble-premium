import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  UiState, 
  Toast, 
  Modal 
} from '../../types/state/ui.types';

// Define initial state
const initialState: UiState = {
  loading: {
    global: false,
  },
  toasts: [],
  activeModals: [],
  sidebarCollapsed: true,
  colorScheme: 'system',
};

// Create the slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Set global loading state
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    
    // Set specific loading key state
    setLoadingState: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      const { key, isLoading } = action.payload;
      state.loading[key] = isLoading;
    },
    
    // Add a toast notification
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = Date.now().toString();
      state.toasts.push({
        id,
        ...action.payload,
      });
    },
    
    // Remove a toast notification
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    // Clear all toasts
    clearToasts: (state) => {
      state.toasts = [];
    },
    
    // Open a modal
    openModal: (state, action: PayloadAction<Omit<Modal, 'id'>>) => {
      const id = Date.now().toString();
      state.activeModals.push({
        id,
        ...action.payload,
      });
    },
    
    // Close a specific modal by id
    closeModal: (state, action: PayloadAction<string>) => {
      state.activeModals = state.activeModals.filter(modal => modal.id !== action.payload);
    },
    
    // Close all modals
    closeAllModals: (state) => {
      state.activeModals = [];
    },
    
    // Toggle sidebar
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.sidebarCollapsed = action.payload;
      } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      }
    },
    
    // Set color scheme
    setColorScheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.colorScheme = action.payload;
      
      // Save to localStorage (will be handled by middleware)
    },
  },
});

// Export actions
export const {
  setGlobalLoading,
  setLoadingState,
  addToast,
  removeToast,
  clearToasts,
  openModal,
  closeModal,
  closeAllModals,
  toggleSidebar,
  setColorScheme,
} = uiSlice.actions;

// Export reducer
export default uiSlice.reducer;