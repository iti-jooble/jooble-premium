/**
 * Types for the UI state slice
 */

/**
 * Interface defining a toast notification
 */
export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

/**
 * Interface defining a modal configuration
 */
export interface Modal {
  id: string;
  type: string; // Will use ModalType enum values from constants/modals.ts
  props?: Record<string, any>;
}

/**
 * Interface defining the UI loading state
 */
export interface LoadingState {
  global: boolean;
  [key: string]: boolean;
}

/**
 * Interface defining the UI state in Redux
 */
export interface UiState {
  loading: LoadingState;
  toasts: Toast[];
  activeModals: Modal[];
  sidebarCollapsed: boolean;
}
