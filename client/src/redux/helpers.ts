import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

/**
 * Helper function to extract consistent error messages from RTK Query errors
 * @param error The error from RTK Query
 * @returns A formatted error message
 */
export function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
  if ('status' in error) {
    // FetchBaseQueryError
    return typeof error.data === 'string' ? error.data : 'API Error';
  } else {
    // SerializedError
    return error.message || "Unknown error occurred";
  }
}