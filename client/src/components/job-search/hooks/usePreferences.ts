import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import isArray from "lodash/isArray";
import debounce from "lodash/debounce";
import { User } from "@/types/state/user.types";
import { userSelectors } from "@/redux/selectors";
import { hasCompletedOnboarding } from "@/utils/localStorage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updatePreferences, refreshJobs } from "@/redux/thunks";
import { LocationTypes, WorkFormats, SeniorityLevels } from "../enums";
import {
  MAX_SALARY,
  JOB_TYPE_TO_LABEL_MAP,
  LOCATION_TYPE_TO_LABEL_MAP,
  EXPERIENCE_LEVEL_TO_LABEL_MAP,
} from "../constants";
import { SelectedPreference, SelectedPreferenceValue } from "../types";
import { TFunction } from "i18next";

function getLabelByEnum<
  EnumType extends { [key: string]: string | number },
  MapType extends Record<number | string, string>,
>(val: number | string, enumObj: EnumType, labelMap: MapType): string {
  let enumValue: number | string = val;

  if (typeof val === "string" && val in enumObj) {
    enumValue = enumObj[val as keyof EnumType];
  }

  return labelMap[enumValue];
}

export const getPreferences = (
  preferences: User["preferences"],
  t: TFunction,
) =>
  Object.entries(preferences)
    .filter(([_, val]) => val ?? false)
    .reduce(
      (acc, [key, value]) => {
        const category = key as keyof User["preferences"];
        if (category === "keywords") {
          return [
            ...acc,
            ...(value as string[]).map((v) => ({
              category,
              value: v,
              label: v,
            })),
          ];
        }

        if (category === "locationTypes") {
          return [
            ...acc,
            ...(value as LocationTypes[]).map((v) => ({
              category,
              value: typeof v === "number" ? v : LocationTypes[v],
              label: t(
                getLabelByEnum(v, LocationTypes, LOCATION_TYPE_TO_LABEL_MAP),
              ),
            })),
          ];
        }

        if (category === "workFormats") {
          return [
            ...acc,
            ...(value as WorkFormats[]).map((v) => ({
              category,
              value: typeof v === "number" ? v : WorkFormats[v],
              label: t(getLabelByEnum(v, WorkFormats, JOB_TYPE_TO_LABEL_MAP)),
            })),
          ];
        }

        if (category === "seniorityLevels") {
          return [
            ...acc,
            ...(value as SeniorityLevels[]).map((v) => ({
              category,
              value: typeof v === "number" ? v : SeniorityLevels[v],
              label: t(
                getLabelByEnum(
                  v,
                  SeniorityLevels,
                  EXPERIENCE_LEVEL_TO_LABEL_MAP,
                ),
              ),
            })),
          ];
        }

        if (category === "salaryRange" && "min" in value) {
          if (!value.min && !value.max) {
            return acc;
          }

          return [
            ...acc,
            {
              category,
              value,
              label: t(`$${value.min || 0}-${value.max || MAX_SALARY}/monthly`),
            },
          ];
        }

        if (category === "experienceYears") {
          return [
            ...acc,
            {
              category,
              value,
              label: t(value ? `${value} years` : "Any experience"),
            },
          ];
        }

        return [
          ...acc,
          {
            category,
            value,
            label: value as string,
          },
        ];
      },
      [] as SelectedPreference<keyof User["preferences"]>[],
    );

const usePreferences = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userPreferences = useAppSelector(
    userSelectors.getUserPreferencesSelector,
  );
  const hasOnboardingCompleted = hasCompletedOnboarding();

  const preferences = getPreferences(userPreferences, t);

  const updatePreferencesAndSearch = async (
    value: Partial<User["preferences"]>,
  ) => {
    await dispatch(updatePreferences(value));

    if (hasOnboardingCompleted) {
      dispatch(refreshJobs());
    }
  };

  const debouncedUpdatePreferences = useMemo(
    () => debounce(updatePreferencesAndSearch, 300),
    [dispatch],
  );

  const togglePreference = <T extends keyof User["preferences"]>({
    key,
    value,
  }: {
    key: T;
    value: SelectedPreferenceValue<T>;
  }) => {
    const isExisting = isSelected({ key, value });

    if (key === "salaryRange") {
      updatePreferencesAndSearch({
        salaryRange: {
          min: 0,
          max: 0,
        },
      });

      return;
    }

    if (key === "experienceYears") {
      updatePreferencesAndSearch({
        experienceYears: isExisting ? 0 : (value as number),
      });
      return;
    }

    if (!isArray(userPreferences[key])) {
      updatePreferencesAndSearch({ [key]: isExisting ? null : value });
      return;
    }

    updatePreferencesAndSearch({
      [key]: isExisting
        ? preferences
            .map((p) => (p.category === key ? p.value : null))
            .filter((v) => v !== null && v !== value)
        : [...(userPreferences[key] || []), value],
    });
  };

  const isSelected = <T extends keyof User["preferences"]>({
    key,
    value,
  }: {
    key: T;
    value: SelectedPreferenceValue<T>;
  }) =>
    preferences.some(
      ({ category, value: selectedValue }) =>
        category === key && selectedValue === value,
    );

  return {
    preferences,
    isSelected,
    togglePreference,
    updatePreferences: debouncedUpdatePreferences,
  };
};

export default usePreferences;
