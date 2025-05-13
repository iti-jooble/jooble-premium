import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiSlice } from "../api/userApiSlice";
import { userSelectors } from "../selectors";
import { USER_PREFERENCES_KEY } from "@/constants/localStorageKeys";
import { updatePreferencesLocaly } from "../slices/userSlice";
import { User } from "@/types/state/user.types";
import { updateUserPreferences as updateUserPreferencesInLocalStorage } from "@/utils/localStorage";

export const updatePreferences = createAsyncThunk<
  void,
  Partial<User["preferences"]> | void
>(
  "user/updatePreferences",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const isAuthorized = userSelectors.isAuthorizedSelector(getState());

      if (payload) {
        dispatch(updatePreferencesLocaly(payload));
      }

      if (!isAuthorized) {
        updateUserPreferencesInLocalStorage(payload);
        return;
      }

      const preferences = userSelectors.getUserPreferencesSelector(getState());

      await dispatch(
        userApiSlice.endpoints.updatePreferences.initiate(preferences, {
          forceRefetch: true,
        }),
      );
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const tryUpdatePreferencesFromLocalStorage = createAsyncThunk(
  "user/tryUpdatePreferencesFromLocalStorage",
  async (_, { dispatch, getState }) => {
    try {
      const json = localStorage.getItem(USER_PREFERENCES_KEY);

      if (!json) {
        return;
      }

      await dispatch(
        updatePreferences(JSON.parse(json) as User["preferences"]),
      );

      const isAuthorized = userSelectors.isAuthorizedSelector(getState());

      if (isAuthorized) {
        localStorage.removeItem(USER_PREFERENCES_KEY);
      }
    } catch (error: any) {
      console.error("Failed to update preferences from local storage:", error);
    }
  },
);
