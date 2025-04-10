import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a toast notification
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Define a modal configuration
export interface Modal {
  id: string;
  type: string;
  props?: Record<string, any>;
}

// Define the UI state
interface UiState {
  // Global UI loading states
  loading: {
    global: boolean;
    [key: string]: boolean;
  };
  
  // Toast notifications
  toasts: Toast[];
  
  // Active modals
  activeModals: Modal[];
  
  // Sidebar state (mobile/responsive view)
  sidebarCollapsed: boolean;
  
  // Theme
  colorScheme: 'light' | 'dark' | 'system';
}

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