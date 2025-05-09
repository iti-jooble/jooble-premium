import axios from "axios";
import { log } from "./vite";
import {
  getFitlyApiUrl,
  getRequestHeaders,
  setResponseHeaders,
} from "./helpers";
import { EXTERNAL_RESPONSE_TYPES } from "./constants";

/**
 * Creates a proxy middleware to forward requests to an external API
 * @param targetUrl The base URL of the external API
 */
export const createApiProxy = ({
  targetUrl,
  responseType = EXTERNAL_RESPONSE_TYPES.JSON,
}: { targetUrl?: string; responseType?: EXTERNAL_RESPONSE_TYPES } = {}) => {
  return async (req: Request, res: Response) => {
    const url = targetUrl ?? `${getFitlyApiUrl()}${req.url}`;

    try {
      log(`Proxying request to: ${url}`, `Method: ${req.method}`);

      const response = await axios({
        method: req.method,
        url,
        data: req.body,
        headers: getRequestHeaders(req),
        params: req.query,
        responseType: responseType,
      });

      setResponseHeaders(res, req, response.headers);

      if (responseType === EXTERNAL_RESPONSE_TYPES.FILE) {
        res.setHeader("Content-Type", response.headers["content-type"]);
        if (response.headers["content-disposition"]) {
          res.setHeader(
            "Content-Disposition",
            response.headers["content-disposition"],
          );
        }

        response.data.pipe(res);
        return;
      }

      res.status(response.status).send(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { message: "External API error" };

        log(`API Proxy error: ${status} - ${JSON.stringify(data)}`, "proxy");
        res.status(status).json(data);
      } else {
        log(`Proxy error: ${error}`, "proxy");
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
};
