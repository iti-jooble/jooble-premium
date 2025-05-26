import { ReactNode } from "react";
import { Prompts, States, Namespaces } from "./enums";
import { IPromptConfig, TAiResponseType } from "@/types/state/cvBuilder.types";

export interface IAIAssistanceConfig {
  requestOnMount: boolean;
  responseType: TAiResponseType;
  texts: Partial<
    Record<keyof typeof States, { title: string | Iterable<ReactNode> }>
  >;
  prompts: Partial<Record<Prompts, IPromptConfig>>;
}

export interface IUseAIAssistanceProps {
  config: IAIAssistanceConfig;
  className?: string;
  insertResponse: (text: string) => void;
  onGenerate?: () => void;
  onRephrase?: () => void;
  onFixSpelling?: () => void;
  onClearResponse?: () => void;
  onRetry?: () => void;
}

export interface IAIAssistanceComponentProps {
  state: States;
  response: string | string[];
  responseType: TAiResponseType;
  lastPrompt: Prompts | null;
  texts: IAIAssistanceConfig["texts"];
  prompts: IAIAssistanceConfig["prompts"];
  className?: string;
  onGenerate: () => void;
  onRephrase: () => void;
  onFixSpelling: () => void;
  onClearResponse: () => void;
  onRetry: () => void;
  onInsertResponse: (text: string) => void;
}

export type TSummaryPrompts =
  | Prompts.generate
  | Prompts.rephrase
  | Prompts.fixSpelling;
export type TExperiencePrompts =
  | Prompts.generate
  | Prompts.rephrase
  | Prompts.fixSpelling;
export type TSkillsPrompts = Prompts.generate;

export interface IPromptMappings {
  [Prompts.generate]: IPromptConfig;
  [Prompts.rephrase]: IPromptConfig;
  [Prompts.fixSpelling]: IPromptConfig;
}

export interface ICvBuilderAIAssistanceConfig<N extends keyof typeof Namespaces>
  extends IAIAssistanceConfig {
  prompts: N extends Namespaces.experience
    ? Record<TExperiencePrompts, IPromptMappings[keyof IPromptMappings]>
    : N extends Namespaces.summary
      ? Record<TSummaryPrompts, IPromptMappings[keyof IPromptMappings]>
      : N extends Namespaces.skills
        ? Record<TSkillsPrompts, IPromptMappings[keyof IPromptMappings]>
        : never;
}
