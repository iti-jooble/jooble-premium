import { USER_PREFERENCES_KEY } from '@/constants/localStorageKeys';

interface UserPreferences {
  onboardingCompleted?: boolean;
  [key: string]: any;
}

/**
 * Retrieves user preferences from localStorage
 */
export const getUserPreferences = (): UserPreferences | null => {
  try {
    const preferences = localStorage.getItem(USER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : null;
  } catch (error) {
    console.error('Error retrieving user preferences:', error);
    return null;
  }
};

/**
 * Saves user preferences to localStorage
 */
export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    const existingPreferences = getUserPreferences() || {};
    const updatedPreferences = { ...existingPreferences, ...preferences };
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

/**
 * Checks if onboarding has been completed
 */
export const hasCompletedOnboarding = (): boolean => {
  const preferences = getUserPreferences();
  return preferences?.onboardingCompleted ?? false;
};

/**
 * Clears all user preferences from localStorage
 * Useful for testing or resetting the application state
 */
export const clearUserPreferences = (): void => {
  try {
    localStorage.removeItem(USER_PREFERENCES_KEY);
  } catch (error) {
    console.error('Error clearing user preferences:', error);
  }
};