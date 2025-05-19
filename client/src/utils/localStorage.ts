import {
  USER_CV_KEY,
  USER_PREFERENCES_KEY,
  HAS_COMPLETED_ONBOARDING_KEY,
} from "@/constants/localStorageKeys";
import { User } from "@/types/state/user.types";
import { CV } from "@shared/schema";

interface UserPreferences {
  [key: string]: any;
}

export const getUserPreferences = (): User["preferences"] | null => {
  try {
    const preferences = localStorage.getItem(USER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error("Error retrieving user preferences:", error);
    return null;
  }
};

export const updateUserPreferences = (
  preferences: User["preferences"],
): void => {
  try {
    const existingPreferences = getUserPreferences() || {};
    const updatedPreferences = { ...existingPreferences, ...preferences };
    localStorage.setItem(
      USER_PREFERENCES_KEY,
      JSON.stringify(updatedPreferences),
    );
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

export const hasCompletedOnboarding = (): boolean =>
  localStorage.getItem(HAS_COMPLETED_ONBOARDING_KEY) || false;

export const setHasCompletedOnboarding = (): boolean => {
  try {
    localStorage.setItem(HAS_COMPLETED_ONBOARDING_KEY, true);
    return true;
  } catch (error) {
    console.error("Error setting onboarding completion:", error);
  }
};

export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(USER_PREFERENCES_KEY);
  } catch (error) {
    console.error("Error clearing user preferences:", error);
  }
};

export const getUserCv = (): CV | null => {
  try {
    const cv = localStorage.getItem(USER_CV_KEY);
    return cv ? JSON.parse(cv) : null;
  } catch (error) {
    console.error("Error retrieving user cv:", error);
    return null;
  }
};

export const createOrUpdateCv = (cv: Partial<CV>): void => {
  try {
    const currentCv = getUserCv() || {};
    const updatedCv = { ...currentCv, ...cv };
    localStorage.setItem(USER_CV_KEY, JSON.stringify(updatedCv));
  } catch (error) {
    console.error("Error saving user cv:", error);
  }
};

export const clearUserCv = (): void => {
  try {
    localStorage.removeItem(USER_CV_KEY);
  } catch (error) {
    console.error("Error clearing user cv:", error);
  }
};
