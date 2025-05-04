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
    theme: "system",
    language: "en",
  },
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return {
        ...state,
        ...action.payload,
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

    updatePreferences: (
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

export const { setUser, logout, updatePreferences, updateSubscription } =
  userSlice.actions;

export default userSlice.reducer;
