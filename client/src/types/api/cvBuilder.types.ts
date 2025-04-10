import { ICv } from "../state/cvBuilder.types";

// Enum to represent the source of a CV
export enum CvSource {
  MANUAL = "manual",
  IMPORTED = "imported",
  GENERATED = "generated",
  AI_ASSISTED = "ai_assisted",
}

export interface ICvBuilderConfigModelApi {
  experienceDurationOptions: string[];
  educationLevelOptions: never[];
  isLoaded: boolean;
}

export interface ICvBuilderPreCreateDataApi {
  fullName: string;
  city: string;
  firstName: string;
  lastName: string;
}

export interface ICVBuilderInitResponse {
  cvList: ICv[];
}

export interface LocalesDictionary
  extends Record<string, Record<string, string>> {}

export interface ICreateCvRequest {
  buildCvId: string;
  source: CvSource;
  json: ICv;
  jdpId: number | null;
  step: number;
  html: string;
  css: string;
}

export interface SuggestAIRequest {
  temperature: number;
  systemContent: string;
  userContent: string;
}

export interface IPromptConfigApi {
  type: string;
  userReplacements: Record<string, string>;
  systemReplacements: Record<string, string>;
}

export interface ICreateCvResponse {
  cvId: number;
}

export interface IAISuggestResponse {
  content: string;
}
