import { JobTypes, LocationTypes, ExperienceLevels } from "./enums";
import { keyofPreferences } from "./types";

export const MAX_SALARY = 200000;
export const MAX_YEARS_OF_EXPERIENCE = 15;

export const JOB_TYPE_TO_LABEL_MAP = {
  [JobTypes.FullTime]: "Full-time",
  [JobTypes.PartTime]: "Part-time",
  [JobTypes.Contract]: "Contract",
  [JobTypes.Temporary]: "Temporary",
  [JobTypes.Internship]: "Internship",
  [JobTypes.Consulting]: "Consulting",
  [JobTypes.Freelance]: "Freelance",
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
  [ExperienceLevels.Intern]: "Intern",
  [ExperienceLevels.Trainee]: "Trainee",
  [ExperienceLevels.Junior]: "Junior",
  [ExperienceLevels.MidLevel]: "Mid-level",
  [ExperienceLevels.Senior]: "Senior-level",
  [ExperienceLevels.Director]: "Director",
  [ExperienceLevels.Manager]: "Manager",
  [ExperienceLevels.Lead]: "Lead",
  [ExperienceLevels.CLevel]: "C-level",
  [ExperienceLevels.VicePresident]: "Vice-President",
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
  jobTypes: {
    label: "Job Type",
    options: Object.values(JobTypes)
      .filter((v) => typeof v === "number")
      .map((value) => ({
        value: value as number,
        label: JOB_TYPE_TO_LABEL_MAP[value as JobTypes],
      })),
  },
  experienceLevels: {
    label: "Experience Level",
    options: Object.values(ExperienceLevels)
      .filter((v) => typeof v === "number")
      .map((value) => ({
        value: value as number,
        label: EXPERIENCE_LEVEL_TO_LABEL_MAP[value as ExperienceLevels],
      })),
  },
};
