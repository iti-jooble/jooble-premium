import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthCredentials,
  AuthByGoogleCredentials,
  RegisterData,
} from "@/types/api/auth.types";
import { AppDispatch } from "@/redux/store";
import { UserState } from "../../types/state/user.types";
import { authApiSlice } from "../api/authApiSlice";
import { setUser } from "../slices/userSlice";

export const authByGoogle = createAsyncThunk<
  Partial<UserState>,
  AuthByGoogleCredentials
>("auth/authByGoogle", async (payload, { dispatch }) => {
  try {
    const result = await dispatch(
      authApiSlice.endpoints.authByGoogle.initiate(payload),
    );

    if (!result.data) {
      throw new Error("Failed to authenticate with Google");
    }

    dispatch(setUser(result.data));

    return result.data;
  } catch (error: any) {
    throw error;
  }
});

export const login = createAsyncThunk<Partial<UserState>, AuthCredentials>(
  "auth/login",
  async (payload, { dispatch }) => {
    try {
      const result = await dispatch(
        authApiSlice.endpoints.login.initiate(payload),
      );

      if (!result.data) {
        throw new Error("Failed to login");
      }

      dispatch(setUser(result.data));

      return result.data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const register = createAsyncThunk<Partial<UserState>, RegisterData>(
  "auth/register",
  async (payload, { dispatch }) => {
    try {
      const result = await dispatch(
        authApiSlice.endpoints.register.initiate(payload),
      );

      if (!result.data) {
        throw new Error("Failed to register");
      }

      dispatch(setUser(result.data));

      return result.data;
    } catch (error: any) {
      throw error;
    }
  },
);
