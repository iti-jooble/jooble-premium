import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApiSlice } from "../api/userApiSlice";
import { userSelectors } from "../selectors";
import { PREFERENCES_KEY } from "@/constants/localStorageKeys";
import { updatePreferencesLocaly } from "../slices/userSlice";
import { User } from "@/types/state/user.types";

export const updatePreferences = createAsyncThunk<
  void,
  Partial<User["preferences"]> | void
>(
  "user/updatePreferences",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      if (payload) {
        dispatch(updatePreferencesLocaly(payload));
      }

      const preferences = userSelectors.getUserPreferencesSelector(getState());

      const result = await dispatch(
        userApiSlice.endpoints.updatePreferences.initiate(preferences, {
          forceRefetch: true,
        }),
      );

      if (!result.data) {
        throw new Error("Failed to search jobs");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const tryUpdatePreferencesFromLocalStorage = createAsyncThunk(
  "user/tryUpdatePreferencesFromLocalStorage",
  async (_, { dispatch }) => {
    try {
      const json = localStorage.getItem(PREFERENCES_KEY);

      if (!json) {
        return;
      }

      await dispatch(
        updatePreferences(JSON.parse(json) as User["preferences"]),
      );

      localStorage.removeItem(PREFERENCES_KEY);
    } catch (error: any) {
      console.error("Failed to update preferences from local storage:", error);
    }
  },
);
