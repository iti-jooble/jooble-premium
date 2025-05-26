import React from "react";
import { TFunction } from "i18next";
import { IAIAssistanceConfig } from "../types";
import { Namespaces } from "../enums";
import { AI_ASSISTANCE_CONFIG } from "../constants";
import { Experience, Education } from "@shared/schema";

export type TSkillsData = {
  experience: Experience[];
  education: Education[];
  languageCode: string;
  t: TFunction;
};

export interface IDataForSkillsAISuggests {
  experience: {
    positions: string;
    responsibilities?: string;
  };
  education: {
    educationLevel: string;
    nameOfInstitution: string;
    specialty?: string;
  };
}

const formatExperienceData = (
  experience: IDataForSkillsAISuggests["experience"],
): string =>
  `Job titles: ${experience.positions}\n\n${
    experience.responsibilities
      ? `Experience:\n${experience.responsibilities}\n`
      : ""
  }`;

const formatEducationData = (
  education: IDataForSkillsAISuggests["education"],
): string =>
  `Education levels: ${education.educationLevel}\nSchool name: ${education.nameOfInstitution}\n${
    education.specialty ? `Field of study: ${education.specialty}\n` : ""
  }`;

const capitalizePositions = (positionsStr: string): string => {
  const positions = positionsStr.split(",").map((position) => position.trim());

  const capitalizedPositions = positions.map((position) => {
    if (position.length > 0) {
      return position.charAt(0).toUpperCase() + position.slice(1).toLowerCase();
    }

    return position;
  });

  return capitalizedPositions.join(", ");
};

export const formatDataForSkillsAISuggests = (
  experienceData: Experience[],
  educationData: Education[],
): IDataForSkillsAISuggests => {
  const experience = {
    positions: experienceData.map((workPlace) => workPlace.position).join(", "),
    responsibilities: experienceData
      .map((workPlace) => workPlace.description || "")
      .join(", "),
  };

  const education = {
    educationLevel: educationData
      .map((educationPlace) => educationPlace.degree)
      .join(", "),
    nameOfInstitution: educationData
      .map((educationPlace) => educationPlace.school)
      .join(", "),
    specialty: educationData
      .map((educationPlace) => educationPlace.field || "")
      .join(", "),
  };

  return { experience, education };
};

export const getSkillsAIAssistanceConfig = ({
  education,
  experience,
  languageCode,
  t,
}: TSkillsData): IAIAssistanceConfig => {
  const { experience: formattedExperience, education: formattedEducation } =
    formatDataForSkillsAISuggests(experience, education);

  const config = AI_ASSISTANCE_CONFIG[Namespaces.skills];

  const prompts: IAIAssistanceConfig["prompts"] = {};

  const experienceDataString = formatExperienceData(formattedExperience);
  const educationDataString = formatEducationData(formattedEducation);
  const positionsForText = capitalizePositions(formattedExperience.positions);

  const texts: IAIAssistanceConfig["texts"] = {
    Initial: {
      title: t("Skills hint for {{jobTitles}}", {
        jobTitles: positionsForText,
      }),
    },
    Loading: {
      title: t("Preparing skills hint for {{jobTitles}}", {
        jobTitles: positionsForText,
      }),
    },
    Response: {
      title: t(
        "Skills hint for {{jobTitles}}. Click on the skills to choose it.",
        {
          jobTitles: positionsForText,
        },
      ),
    },
  };

  const language = t(`English`);

  const skillsPromptData = `experienceData: ${experienceDataString}, educationData: ${educationDataString}`;

  if (formattedExperience.positions) {
    prompts.generate = {
      ...config.prompts.generate,
      userReplacements: {
        "{language}": language,
        "{skillsData}": skillsPromptData,
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
