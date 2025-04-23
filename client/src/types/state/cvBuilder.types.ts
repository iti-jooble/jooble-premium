import { CV, experience, Skill } from "@shared/schema";

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
  experience: experience[];
  skills: Skill[];
  targetPosition?: string;
}

export interface IAIRecommendation {
  type: "skill" | "summary" | "experience" | "education";
  content: string;
  score: number;
  reason: string;
}
