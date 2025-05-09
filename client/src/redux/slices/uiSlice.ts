import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiState, Toast, Modal } from "../../types/state/ui.types";

const initialState: UiState = {
  loading: {
    global: false,
  },
  toasts: [],
  activeModals: [],
  sidebarCollapsed: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  selectors: {
    getToastsSelector: (state) => state.toasts,
    getActiveModalsSelector: (state) => state.activeModals,
    getSidebarCollapsedSelector: (state) => state.sidebarCollapsed,
  },
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },

    setLoadingState: (
      state,
      action: PayloadAction<{ key: string; isLoading: boolean }>,
    ) => {
      const { key, isLoading } = action.payload;
      state.loading[key] = isLoading;
    },

    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Date.now().toString();
      state.toasts.push({
        id,
        ...action.payload,
      });
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },

    clearToasts: (state) => {
      state.toasts = [];
    },

    openModal: (state, action: PayloadAction<Omit<Modal, "id">>) => {
      const id = Date.now().toString();
      state.activeModals.push({
        id,
        ...action.payload,
      });
    },

    closeModal: (state, action: PayloadAction<string>) => {
      state.activeModals = state.activeModals.filter(
        (modal) => modal.id !== action.payload,
      );
    },

    closeAllModals: (state) => {
      state.activeModals = [];
    },

    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      if (action.payload !== undefined) {
        state.sidebarCollapsed = action.payload;
      } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      }
    },
  },
});

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
} = uiSlice.actions;

export const selectors = uiSlice.selectors;

export default uiSlice.reducer;
