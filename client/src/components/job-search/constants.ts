import { WorkFormats, LocationTypes, SeniorityLevels } from "./enums";
import { keyofPreferences } from "./types";

export const MAX_SALARY = 50000;
export const MAX_YEARS_OF_EXPERIENCE = 15;

export const JOB_TYPE_TO_LABEL_MAP = {
  [WorkFormats.FullTime]: "Full-time",
  [WorkFormats.PartTime]: "Part-time",
  [WorkFormats.Contract]: "Contract",
  [WorkFormats.Temporary]: "Temporary",
  [WorkFormats.Internship]: "Internship",
  [WorkFormats.Consulting]: "Consulting",
  [WorkFormats.Freelance]: "Freelance",
};

export const LOCATION_TYPE_TO_LABEL_MAP = {
  [LocationTypes.OnSite]: "On-site",
  [LocationTypes.Remote]: "Remote",
  [LocationTypes.Hybrid]: "Hybrid",
  [LocationTypes.OfficeBased]: "Office-based",
  [LocationTypes.FieldBased]: "Field-based",
  [LocationTypes.FlexibleLocation]: "Flexible",
};

export const EXPERIENCE_LEVEL_TO_LABEL_MAP = {
  [SeniorityLevels.Intern]: "Intern",
  [SeniorityLevels.Trainee]: "Trainee",
  [SeniorityLevels.Junior]: "Junior",
  [SeniorityLevels.MidLevel]: "Mid-level",
  [SeniorityLevels.Senior]: "Senior-level",
  [SeniorityLevels.Director]: "Director",
  [SeniorityLevels.Manager]: "Manager",
  [SeniorityLevels.Lead]: "Lead",
  [SeniorityLevels.CLevel]: "C-level",
  [SeniorityLevels.VicePresident]: "Vice-President",
};

export const preferencesConfig: {
  [key in keyofPreferences]: {
    label: string;
    options: {
      value: number;
      label: string;
    }[];
  };
} = {
  locationTypes: {
    label: "Location Type",
    options: Object.values(LocationTypes)
      .filter((v) => typeof v === "number")
      .map((value) => ({
        value: value as number,
        label: LOCATION_TYPE_TO_LABEL_MAP[value as LocationTypes],
      })),
  },
  workFormats: {
    label: "Job Type",
    options: Object.values(WorkFormats)
      .filter((v) => typeof v === "number")
      .map((value) => ({
        value: value as number,
        label: JOB_TYPE_TO_LABEL_MAP[value as WorkFormats],
      })),
  },
  seniorityLevels: {
    label: "Experience Level",
    options: Object.values(SeniorityLevels)
      .filter((v) => typeof v === "number")
      .map((value) => ({
        value: value as number,
        label: EXPERIENCE_LEVEL_TO_LABEL_MAP[value as SeniorityLevels],
      })),
  },
};
