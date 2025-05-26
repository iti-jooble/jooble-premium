import type { Express } from "express";
import axios from "axios";
import multer from "multer";
import { createServer, type Server } from "http";
import { createApiProxy } from "./apiProxy";
import { EXTERNAL_RESPONSE_TYPES } from "./constants";
import { getBaseApiUrl, getFitlyApiUrl } from "./helpers";
import { cvParsingSchema } from "./cvParsingSchema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Application initialization endpoint
  app.post(
    "/api/init",
    createApiProxy({
      targetUrl: `${getFitlyApiUrl()}/api/FitlyBaseApi/BaseInit`,
    }),
  );

  // === Payment API Routes ===
  app.post("/api/payment/createcheckoutsession", createApiProxy());

  // Customer Portal endpoint
  app.post("/api/payment/customerPortal", createApiProxy());

  // === CV API Routes ===

  // Get all CVs
  app.get("/api/cvs", createApiProxy());

  // Get CV by ID
  app.get("/api/cvs/:id", createApiProxy());

  // Create new CV
  app.post("/api/cvs", createApiProxy());

  // Update CV
  app.put("/api/cvs/:id", createApiProxy());

  // Delete CV
  app.delete("/api/cvs/:id", createApiProxy());

  // Duplicate CV
  app.post("/api/cvs/:id/duplicate", createApiProxy());

  // Parse CV from file
  app.post("/api/cvs/parse", multer().single("file"), (req, res) => {
    console.log("file size", req.file?.size);

    axios
      .post(
        "https://api.openai.com/v1/responses",
        {
          model: "gpt-4.1",
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_file",
                  filename: req.file?.originalname,
                  file_data: `data:application/pdf;base64,${req.file?.buffer.toString("base64")}`,
                },
                {
                  type: "input_text",
                  text: JSON.stringify(cvParsingSchema),
                },
              ],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        res.send(response.data.output[0].content[0].text);
      })
      .catch((error) => {
        const data = error.response?.data ?? {
          message: error.message ?? "External API error",
        };
        res.status(500).json(data);
      });
  });

  app.post(
    "/api/cvs/getAISuggestion",
    createApiProxy({ targetUrl: `${getBaseApiUrl()}/api/cvbuilder/suggestv2` }),
  );

  // === Auth API Routes ===

  // Login
  app.post("/api/auth/login", createApiProxy());

  // Register
  app.post("/api/auth/register", createApiProxy());

  // Auth with Google
  app.post("/api/auth/bygoogle", createApiProxy());

  // Logout
  app.post("/api/auth/logout", createApiProxy());

  app.get(
    "/api/cvs/:id/download",
    createApiProxy({ responseType: EXTERNAL_RESPONSE_TYPES.FILE }),
  );

  // === Job Search API Routes ===

  // Get job listings
  app.post("/api/jobs/search", createApiProxy());

  // Get job details by UID
  app.get("/api/jobs/:uid", createApiProxy());

  // === User API Routes ===

  // Update user preferences
  app.put("/api/user/preferences", createApiProxy());

  // === AutoComplete API Routes ===
  app.get(
    "/api/autocomplete",
    createApiProxy({ targetUrl: `${getBaseApiUrl()}/autocomplete` }),
  );

  const httpServer = createServer(app);
  return httpServer;
}
