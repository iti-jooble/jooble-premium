import { AxiosResponseHeaders } from "axios";
import { SHARED_HEADERS } from "./constants";

export const setResponseHeaders = (
  res: Response,
  req: Request,
  headers: AxiosResponseHeaders,
) => {
  Object.entries(headers).forEach(([key, value]) => {
    if (!SHARED_HEADERS.includes(key.toLowerCase())) {
      return;
    }

    if (key.toLowerCase() === "set-cookie") {
      const newSetCookie = value.reduce((acc, cookie) => {
        const newValue = cookie.replace(
          /domain=[^;]+;?\s*/,
          `domain=${req.headers.host || ""};`,
        );
        acc.push(newValue);
        return acc;
      }, []);

      res.set(key, newSetCookie);
      return;
    }
    res.set(key, value);
  });
};

export const getRequestHeaders = (req: Request) => ({
  ...Object.entries(req.headers)
    .filter(([key]) => SHARED_HEADERS.includes(key.toLowerCase()))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
  "x-api-key": process.env.EXTERNAL_API_KEY || "fitly-web-api-key",
});

// localhost url: https://9dda-78-25-4-231.ngrok-free.app/fitly
export const getBaseApiUrl = (): string => {
  return process.env.API_URL || "https://uk.jooble.org";
};

export const getFitlyApiUrl = (): string => `${getBaseApiUrl()}/fitly`;
