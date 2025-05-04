export interface AuthCredentials {
  email: string;
  password: string;
  source?: number;
  type?: number;
}

export interface AuthByGoogleCredentials {
  token: string;
  source?: number;
}

export interface RegisterData extends AuthCredentials {
  name?: string;
  lastName?: string;
}

export interface AuthResponse {
  isAuthorized: boolean;
  firstName: string;
  lastName: string;
  email: string;
  status: number;
}
