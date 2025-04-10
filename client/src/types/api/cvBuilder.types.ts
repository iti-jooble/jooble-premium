import { CV } from "@shared/schema";

export enum CvSource {
  MANUAL = 'manual',
  IMPORTED = 'imported',
  AI_GENERATED = 'ai_generated',
  TEMPLATE = 'template'
}

// CV API types
export interface ICreateCvRequest {
  id: string;
  source: CvSource;
  json: any;  // CV data model
  html: string;
  css: string;
}

export interface ICreateCvResponse {
  success: boolean;
  message?: string;
}

export interface IUpdateCvRequest {
  id: string;
  json: any;  // CV data model
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
  cv?: CV;  // The duplicated CV
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