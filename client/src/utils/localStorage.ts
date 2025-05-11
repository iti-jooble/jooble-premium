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
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

/**
 * Checks if onboarding has been completed
 */
export const hasCompletedOnboarding = (): boolean => {
  const preferences = getUserPreferences();
  return !!preferences; // Return true if preferences exist
};