import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import isArray from "lodash/isArray";
import debounce from "lodash/debounce";
import { User } from "@/types/state/user.types";
import { userSelectors } from "@/redux/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updatePreferences, refreshJobs } from "@/redux/thunks";
import { LocationTypes, JobTypes, ExperienceLevels } from "../enums";
import {
  MAX_SALARY,
  JOB_TYPE_TO_LABEL_MAP,
  LOCATION_TYPE_TO_LABEL_MAP,
  EXPERIENCE_LEVEL_TO_LABEL_MAP,
} from "../constants";
import { SelectedPreference, SelectedPreferenceValue } from "../types";
import { TFunction } from "i18next";

export const getSelectedPreferences = (
  preferences: User["preferences"],
  t: TFunction,
) =>
  Object.entries(preferences)
    .filter(([_, val]) => val ?? false)
    .reduce(
      (acc, [key, value]) => {
        const category = key as keyof User["preferences"];
        if (category === "keywords") {
          return acc;
        }

        if (category === "locationTypes") {
          return [
            ...acc,
            ...(value as LocationTypes[]).map((v) => ({
              category,
              value: v,
              label: t(LOCATION_TYPE_TO_LABEL_MAP[v]),
            })),
          ];
        }

        if (category === "jobTypes") {
          return [
            ...acc,
            ...(value as JobTypes[]).map((v) => ({
              category,
              value: v,
              label: t(JOB_TYPE_TO_LABEL_MAP[v]),
            })),
          ];
        }

        if (category === "experienceLevels") {
          return [
            ...acc,
            ...(value as ExperienceLevels[]).map((v) => ({
              category,
              value: v,
              label: t(EXPERIENCE_LEVEL_TO_LABEL_MAP[v]),
            })),
          ];
        }

        if (category === "salaryRange" && "lowerBound" in value) {
          if (!value.lowerBound && !value.upperBound) {
            return acc;
          }

          return [
            ...acc,
            {
              category,
              value,
              label: t(
                `$${value.lowerBound || 0}-${value.upperBound || MAX_SALARY}/yearly`,
              ),
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

  const selectedPreferences = getSelectedPreferences(userPreferences, t);

  const updatePreferencesAndSearch = async (
    value: Partial<User["preferences"]>,
  ) => {
    await dispatch(updatePreferences(value));
    dispatch(refreshJobs());
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
          lowerBound: 0,
          upperBound: 0,
        },
      });

      return;
    }

    if (!isArray(userPreferences[key])) {
      updatePreferencesAndSearch({ [key]: isExisting ? null : value });
      return;
    }

    updatePreferencesAndSearch({
      [key]: isExisting
        ? userPreferences[key]?.filter((v) => v !== value)
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
    selectedPreferences.some(
      ({ category, value: selectedValue }) =>
        category === key && selectedValue === value,
    );

  return {
    selectedPreferences,
    isSelected,
    togglePreference,
    updatePreferences: debouncedUpdatePreferences,
  };
};

export default usePreferences;
