/**
 * Types for the user state slice
 */

/**
 * Interface defining the user state in Redux
 */
export interface UserState {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  isPremium: boolean;
  isAuthenticated: boolean;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}