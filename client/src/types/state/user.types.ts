export enum SUBSCRIPTION_TYPES {
  FREE = 0,
  PREMIUM = 1,
}

export interface UserState {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  status: number | null;
  isPremium: boolean;
  isAuthorized: boolean;
  subscription: {
    type: SUBSCRIPTION_TYPES;
    expirationDate: string;
  };
  preferences: {
    theme: "light" | "dark" | "system";
    language: string;
  };
}
