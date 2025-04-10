/**
 * Types for the Auth API
 */

/**
 * Interface defining a user
 */
export interface User {
  id: string;
  username: string;
  email?: string;
  fullName?: string;
  isPremium: boolean;
}

/**
 * Interface for auth response
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Interface for login request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interface for register request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Interface for change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Interface for update profile request
 */
export interface UpdateProfileRequest {
  fullName?: string;
  email?: string;
  username?: string;
}

/**
 * Interface for password reset request
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * Interface for password reset confirmation
 */
export interface ResetPasswordConfirmRequest {
  token: string;
  newPassword: string;
}