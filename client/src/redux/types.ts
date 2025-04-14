import {
  AsyncThunkPayloadCreator,
  AsyncThunkOptions,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ThunkApiConfig {
  state: RootState;
}

declare module "@reduxjs/toolkit" {
  export function createAsyncThunk<R, A = void, C = unknown>(
    type: string,
    payloadCreator: AsyncThunkPayloadCreator<R, A, C & ThunkApiConfig>,
    options?: AsyncThunkOptions<A, C & ThunkApiConfig>,
  ): AsyncThunk<R, A, C & ThunkApiConfig>;
}
