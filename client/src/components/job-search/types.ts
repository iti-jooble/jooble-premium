import { User } from "@/types/state/user.types";

export type SelectedPreference<T extends keyof User["preferences"]> = {
  category: T;
  value: SelectedPreferenceValue<T>;
  label?: string;
};

export type SelectedPreferenceValue<T extends keyof User["preferences"]> =
  User["preferences"][T] extends Array<infer U> ? U : User["preferences"][T];

export type keyofPreferences = Extract<
  keyof User["preferences"],
  "locationTypes" | "workFormats" | "seniorityLevels"
>;
