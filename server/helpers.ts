import { SHARED_HEADERS } from "./constants";

export const setResponseHeaders = (
  res: Response,
  headers: Record<string, string>,
) => {
  Object.entries(headers).forEach(([key, value]) => {
    res.set(key, value);
  });
};

export const getRequestHeaders = (req: Request) => ({
  ...Object.entries(req.headers)
    .filter(([key]) => SHARED_HEADERS.includes(key.toLowerCase()))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
  // Add API key if needed
  ...(process.env.EXTERNAL_API_KEY && {
    "x-api-key": process.env.EXTERNAL_API_KEY,
  }),
});

export const getApiUrl = (): string => {
  return process.env.API_URL || "https://9dda-78-25-4-231.ngrok-free.app/fitly";
};
