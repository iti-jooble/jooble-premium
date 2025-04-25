import { CV } from "@shared/schema";

export enum CvSource {
  MANUAL = 100,
  DUPLICATED = 101,
  IMPORTED = 102,
}

export interface ICreateCvRequest {
  html?: string;
  css?: string;
  cvModel: Partial<CV>;
}

export interface IUpdateCvRequest extends ICreateCvRequest {
  id: number;
}

export interface IUpdateCvResponse {
  success: boolean;
  message?: string;
}

export interface IDeleteCvRequest {
  id: string;
}

export interface IDuplicateCvRequest {
  id: string;
  newTitle?: string;
}

// AI Suggestion API types
export interface IPromptConfigApi {
  section: string;
  jobTitle?: string;
  additionalContext?: string;
}
