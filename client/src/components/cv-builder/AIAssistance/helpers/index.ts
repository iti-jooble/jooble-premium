import { IAIAssistanceConfig } from "../types";
import { getSkillsAIAssistanceConfig, TSkillsData } from "./skills";
import { Namespaces } from "../enums";
import { TExperienceData, getExperienceAIAssistanceConfig } from "./experience";
import { TSummaryData, getSummaryAIAssistanceConfig } from "./summary";

type TDataMap = {
  [Namespaces.experience]: TExperienceData;
  [Namespaces.summary]: TSummaryData;
  [Namespaces.skills]: TSkillsData;
};

export const getAIAssistanceConfigByNamespace = <T extends keyof TDataMap>(
  namespase: T,
  data: TDataMap[T],
): IAIAssistanceConfig => {
  switch (namespase) {
    case Namespaces.experience:
      return getExperienceAIAssistanceConfig(
        data as TDataMap[Namespaces.experience],
      );
    case Namespaces.summary:
      return getSummaryAIAssistanceConfig(data as TDataMap[Namespaces.summary]);
    case Namespaces.skills:
      return getSkillsAIAssistanceConfig(data as TDataMap[Namespaces.skills]);
    default:
      throw new Error("Unknown namespace");
  }
};
