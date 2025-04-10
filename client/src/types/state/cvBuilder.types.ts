import { CV } from "@shared/schema";

export interface CVBuilderState {
  // ID of the currently selected CV
  currentCvId: string | null;
  
  // List of all CVs
  cvList: CV[];
  
  // Loading state
  isLoading: boolean;
  
  // Whether the CV builder has been initialized
  isInitialized: boolean;
  
  // Whether the user is currently editing a CV
  isEditing: boolean;
  
  // The current section being edited
  currentSection: string;
  
  // Whether a save operation is in progress
  isSaving: boolean;
  
  // Error message, if any
  error: string | null;
}