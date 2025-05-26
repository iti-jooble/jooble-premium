import React from "react";
import { TFunction } from "i18next";
import { IAIAssistanceConfig } from "../types";
import { Namespaces } from "../enums";
import { AI_ASSISTANCE_CONFIG } from "../constants";
import { Experience } from "@shared/schema";

export type TExperienceData = {
  experience: Experience;
  languageCode: string;
  t: TFunction;
};

const MIN_TEXT_LENGTH = 40;
const MIN_POSITION_LENGTH = 3;

export const getExperienceAIAssistanceConfig = ({
  experience,
  languageCode,
  t,
}: TExperienceData): IAIAssistanceConfig => {
  const config = AI_ASSISTANCE_CONFIG[Namespaces.experience];

  const prompts: IAIAssistanceConfig["prompts"] = {};

  const language = t("English");

  const texts: IAIAssistanceConfig["texts"] = {
    Initial: {
      title: t(
        "<strong>Need a hint?</strong> Start with a draft or add your text and use the tools below to improve it.",
      ),
    },
    Loading: { title: t("<strong>Working on it...</strong>") },
    Response: { title: t("<strong>Your CV hint is ready</strong>") },
  };

  if (
    experience.position &&
    experience.position.length >= MIN_POSITION_LENGTH
  ) {
    prompts.generate = {
      ...config.prompts.generate,
      userReplacements: {
        "{language}": language,
        "{jobTitle}": experience.position,
      },
      systemReplacements: {},
    };

    if (
      experience.description &&
      experience.description.length >= MIN_TEXT_LENGTH
    ) {
      prompts.rephrase = {
        ...config.prompts.rephrase,
        userReplacements: {
          "{language}": language,
          "{text}": experience.description,
        },
        systemReplacements: {
          "{jobTitle}": experience.position,
        },
      };
    }
  }

  if (
    experience.description &&
    experience.description.length >= MIN_TEXT_LENGTH
  ) {
    prompts.fixSpelling = {
      ...config.prompts.fixSpelling,
      userReplacements: {
        "{language}": language,
        "{text}": experience.description,
      },
      systemReplacements: {},
    };
  }

  return {
    ...config,
    texts,
    prompts,
  };
};
