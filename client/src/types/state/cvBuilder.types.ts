import { CV, WorkExperience, Skill } from "@shared/schema";

export interface ICVTemplate {
  id: number;
  name: string;
  previewImage: string;
  isPremium: boolean;
}

export interface ICVBuilderState {
  currentCvId: string | null;
  cvList: CV[];
  isLoading: boolean;
  isInitialized: boolean;
  isSaving: boolean;
  error: string | null;
}

export interface IAISkillSuggestion {
  skill: string;
  relevance: number;
  description: string;
}

export interface IAISummaryRequest {
  experience: WorkExperience[];
  skills: Skill[];
  targetPosition?: string;
}

export interface IAIRecommendation {
  type: "skill" | "summary" | "workExperience" | "education";
  content: string;
  score: number;
  reason: string;
}
