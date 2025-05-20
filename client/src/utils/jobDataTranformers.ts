import isArray from "lodash/isArray";
import {
  LocationTypes,
  WorkFormats,
  SeniorityLevels,
} from "@/components/job-search/enums";
import {
  JOB_TYPE_TO_LABEL_MAP,
  LOCATION_TYPE_TO_LABEL_MAP,
  EXPERIENCE_LEVEL_TO_LABEL_MAP,
} from "@/components/job-search/constants";

export const getWorkFormatInText = <T extends string>(
  workFormat?: T | T[],
): string | null => {
  if (!workFormat) {
    return null;
  }

  if (isArray(workFormat)) {
    return workFormat.map((w) => getWorkFormatInText(w)).join(", ");
  }

  return JOB_TYPE_TO_LABEL_MAP[
    WorkFormats[workFormat as keyof typeof WorkFormats]
  ];
};

export const getLocationTypeInText = <T extends string>(
  locationType?: T | T[],
): string | null => {
  if (!locationType) {
    return null;
  }

  if (isArray(locationType)) {
    return locationType.map((w) => getLocationTypeInText(w)).join(", ");
  }

  return LOCATION_TYPE_TO_LABEL_MAP[
    LocationTypes[locationType as keyof typeof LocationTypes]
  ];
};

export const getSeniorityLevelInText = <T extends string>(
  seniorityLevel?: T | T[],
): string | null => {
  if (!seniorityLevel) {
    return null;
  }

  if (isArray(seniorityLevel)) {
    return seniorityLevel.map((w) => getSeniorityLevelInText(w)).join(", ");
  }

  return EXPERIENCE_LEVEL_TO_LABEL_MAP[
    SeniorityLevels[seniorityLevel as keyof typeof SeniorityLevels]
  ];
};
