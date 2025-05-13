export enum SUBSCRIPTION_TYPES {
  FREE = 0,
  PREMIUM = 1,
}

export interface User {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isAuthorized: boolean;
  subscription: {
    type: SUBSCRIPTION_TYPES;
    expirationDate: string;
  };
  preferences: {
    keywords: string[];
    location: string | null;
    workFormats: number[];
    salaryRange: {
      min: number | null;
      max: number | null;
    };
    seniorityLevels: string[];
    locationTypes: string[];
    experienceYears: number;
  };
  language: string;
}

export interface UserState extends User {
  status: number | null;
  isPremium: boolean;
}
