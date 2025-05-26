import React from "react";
import { TFunction } from "i18next";
import { IAIAssistanceConfig } from "../types";
import { Namespaces } from "../enums";
import { AI_ASSISTANCE_CONFIG } from "../constants";
import { Experience, Education } from "@shared/schema";

export type TSummaryData = {
  summary: string | null;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languageCode: string;
  t: TFunction;
};

const MIN_TEXT_LENGTH = 40;

const getExperienceText = (experience: Experience[]): string => {
  const sortedExperience = [...experience].sort((a, b) =>
    a.isCurrent && !b.isCurrent
      ? -1
      : parseInt(b.startYear) - parseInt(a.startYear),
  );

  const jobTitle = sortedExperience[0].position
    ? `Job title: ${sortedExperience[0].position} \n\n`
    : "";

  const experienceText = sortedExperience.reduce((acc, item) => {
    if (!item.position) {
      return acc;
    }

    let row = item.position;

    if (item.company) {
      row += `, ${item.company}`;
    }

    return `${acc + row}\n`;
  }, "");

  return jobTitle + (experienceText ? `Experience:\n ${experienceText}` : "");
};

const getEducationText = (education: Education[]): string => {
  const educationText = education.reduce((acc, item) => {
    if (!item.school) {
      return acc;
    }

    let row = item.school;

    if (item.field) {
      row += `, ${item.field}`;
    }

    if (item.degree) {
      row += `, ${item.degree}`;
    }

    return `${acc + row}\n`;
  }, "");

  return educationText ? `Education:\n ${educationText}` : "";
};

const getSkillsText = (skills: string[]): string =>
  skills?.length ? `Skills:\n ${skills.join(", ")}` : "";

export const getSummaryAIAssistanceConfig = ({
  summary,
  experience,
  education,
  skills,
  languageCode,
  t,
}: TSummaryData): IAIAssistanceConfig => {
  const config = AI_ASSISTANCE_CONFIG[Namespaces.summary];

  const prompts: IAIAssistanceConfig["prompts"] = {};

  const language = t(`language.${languageCode}`);

  const experienceText =
    experience && experience.length > 0 ? getExperienceText(experience) : "";

  const educationText =
    education && education.length > 0 ? getEducationText(education) : "";

  const skillsText = skills && skills.length > 0 ? getSkillsText(skills) : "";

  const summaryData = [experienceText, educationText, skillsText]
    .filter(Boolean)
    .join("\n");

  if (summaryData) {
    prompts.generate = {
      ...config.prompts.generate,
      userReplacements: {
        "{language}": language,
        "{summaryData}": summaryData,
      },
      systemReplacements: {},
    };
  }

  if (summary && summary.length >= MIN_TEXT_LENGTH) {
    prompts.rephrase = {
      ...config.prompts.rephrase,
      userReplacements: {
        "{language}": language,
        "{text}": summary,
      },
      systemReplacements: {},
    };

    prompts.fixSpelling = {
      ...config.prompts.fixSpelling,
      userReplacements: {
        "{language}": language,
        "{text}": summary,
      },
      systemReplacements: {},
    };
  }

  const texts: IAIAssistanceConfig["texts"] = {
    Initial: {
      title: t(
        "<strong>Need a hint?</strong> Start with a draft or add your text and use the tools below to improve it.",
      ),
    },
    Loading: { title: t("<strong>Working on it...</strong>") },
    Response: { title: t("<strong>Your CV hint is ready</strong>") },
  };

  return {
    ...config,
    texts,
    prompts,
  };
};
