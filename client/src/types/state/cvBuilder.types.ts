import { CV, Experience, Skill } from "@shared/schema";

export interface ICVTemplate {
  id: number;
  name: string;
  previewImage: string;
  isPremium: boolean;
}

export interface ICVBuilderState {
  currentCvId: number | null;
  cvList: CV[];
  isLoading: boolean;
  isInitialized: boolean;
  isSaving: boolean;
  error: string | null;
}

export type TAiResponseType = "string" | "array";

type TAiReplacements = Record<string, string>;

export type IPromptConfig = {
  type: string;
  userReplacements: TAiReplacements;
  systemReplacements: TAiReplacements;
};
