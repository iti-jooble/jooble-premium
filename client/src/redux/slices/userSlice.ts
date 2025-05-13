import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, SUBSCRIPTION_TYPES } from "../../types/state/user.types";

const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  status: null,
  isPremium: false,
  isAuthorized: false,
  subscription: {
    type: SUBSCRIPTION_TYPES.FREE,
    expirationDate: "",
  },
  preferences: {
    salaryRange: {
      min: 0,
      max: 0,
    },
    workFormats: [],
    seniorityLevels: [],
    experienceYears: 0,
    keywords: [],
    location: null,
    locationTypes: [],
  },
  language: "en",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  selectors: {
    getUserSelector: (state) => state,
    getUserPreferencesSelector: (state) => state.preferences || {},
    getUserSubscriptionSelector: (state) => state.subscription,
    isAuthorizedSelector: (state) => state.isAuthorized,
  },
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
        preferences: action.payload.preferences ?? initialState.preferences,
      };
    },

    logout: (state) => {
      state.isAuthorized = false;
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.isPremium = false;
    },

    updatePreferencesLocaly: (
      state,
      action: PayloadAction<Partial<UserState["preferences"]>>,
    ) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },

    updateSubscription: (
      state,
      action: PayloadAction<Partial<UserState["subscription"]>>,
    ) => {
      state.subscription = {
        ...state.subscription,
        ...action.payload,
      };

      state.isPremium = action.payload.type !== SUBSCRIPTION_TYPES.FREE;
    },
  },
});

export const { setUser, logout, updatePreferencesLocaly, updateSubscription } =
  userSlice.actions;

export const selectors = userSlice.selectors;

export default userSlice.reducer;
