import { CV } from "@shared/schema";

export enum CvSource {
  MANUAL = 100,
  DUPLICATED = 101,
  IMPORTED = 102,
}

// CV API types
export interface ICreateCvRequest {
  html?: string;
  css?: string;
  cvModel: Partial<CV>;
}

export interface ICreateCvResponse {
  success: boolean;
  message?: string;
}

export interface IUpdateCvRequest {
  id: string;
  cvModel: Partial<CV>;
  html: string;
  css: string;
}

export interface IUpdateCvResponse {
  success: boolean;
  message?: string;
}

export interface IDeleteCvRequest {
  id: string;
}

export interface IDeleteCvResponse {
  success: boolean;
  message?: string;
}

export interface IDuplicateCvRequest {
  id: string;
  newTitle?: string;
}

export interface IDuplicateCvResponse {
  success: boolean;
  cv?: CV; // The duplicated CV
  message?: string;
}

// AI Suggestion API types
export interface IPromptConfigApi {
  section: string;
  jobTitle?: string;
  additionalContext?: string;
}

export interface IAiSuggestionResponse {
  success: boolean;
  suggestion?: string;
  message?: string;
}
