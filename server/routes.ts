import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { log } from "./vite";
import { storage } from "./storage";

/**
 * Creates a proxy middleware to forward requests to an external API
 * @param targetUrl The base URL of the external API
 */
const createApiProxy = (targetUrl: string) => {
  return async (req: Request, res: Response) => {
    const url = `${targetUrl}${req.url.replace(/^\/api/, "")}`;

    try {
      log(`Proxying request to: ${url}`, "proxy");

      // Forward the request to the external API
      const response = await axios({
        method: req.method,
        url,
        data: req.body,
        headers: {
          // Forward relevant headers, but exclude ones related to the Express server
          ...Object.entries(req.headers)
            .filter(
              ([key]) => !["host", "connection"].includes(key.toLowerCase()),
            )
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
          // Add API key if needed
          ...(process.env.EXTERNAL_API_KEY && {
            "x-api-key": process.env.EXTERNAL_API_KEY,
          }),
        },
        // Forward query parameters
        params: req.query,
        // Support for binary responses
        responseType: "arraybuffer",
      });

      // Set response headers
      Object.entries(response.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          res.set(key, value as string);
        }
      });

      // Send response
      res.status(response.status).send(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle API error
        const status = error.response?.status || 500;
        const data = error.response?.data || { message: "External API error" };

        log(`API Proxy error: ${status} - ${JSON.stringify(data)}`, "proxy");
        res.status(status).json(data);
      } else {
        // Handle general error
        log(`Proxy error: ${error}`, "proxy");
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
};

const getApiUrl = (): string => {
  return process.env.API_URL || "https://9dda-78-25-4-231.ngrok-free.app/fitly";
};

export async function registerRoutes(app: Express): Promise<Server> {
  // === API Routes ===

  // Health check endpoint
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Application initialization endpoint
  app.get("/api/init", async (req, res) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.post(
        `${apiUrl}/api/FitlyBaseApi/BaseInit`,
        {},
        {
          headers: {
            authorization: req.headers.authorization,
            cookie: req.headers.cookie,
          },
        },
      );

      res.json(response.data);
    } catch (error: any) {
      log(`Error in app initialization: ${error.message}`, "api");
      res.status(500).json({
        error: "Failed to initialize application",
        message: error.message,
      });
    }
  });

  // === Payment API Routes ===
  app.post(
    "/api/payment/createcheckoutsession",
    async (req: Request, res: Response) => {
      try {
        // Mock successful checkout session creation
        res.json({
          success: true,
          sessionId: "mock-session-" + Date.now(),
          url: "https://example.com/checkout/success",
        });
      } catch (error: any) {
        console.log(`Error creating checkout session: ${error.message}`);
        res.status(500).json({
          error: "Failed to create checkout session",
          message: error.message,
        });
      }
    },
  );

  // Customer Portal endpoint
  app.post(
    "/api/payment/customerPortal",
    async (req: Request, res: Response) => {
      try {
        // Mock successful customer portal creation
        res.json({
          success: true,
          url: "https://example.com/customer/portal",
        });
      } catch (error: any) {
        console.log(`Error creating customer portal session: ${error.message}`);
        res.status(500).json({
          error: "Failed to create customer portal session",
          message: error.message,
        });
      }
    },
  );

  // === CV API Routes ===

  // Get all CVs
  app.get("/api/cvs", async (_, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.get(`${apiUrl}/cvs`, {
        headers: {
          Cookie:
            "AspNetCore.Auth=CfDJ8GdChKJoNXRDjdtYcEccIJMhI_cb45jJQru_qMrzGUnaIvpAJHhATXEzX5uIFlStRIWgLxHNLs3ihvIBUfuvX4ZfmMIEO1bEcyi6JDnqj3hcM9cAokdnaDy-DqssWwjgdDnNZSEuRdQ0gBa8PQ2GsNRfpVcw9NGwhqQ9GiEr9Ioumv-TvqfJ0zVCq36GPsS-A4wVcDy7sLmvVgTC2xAlx-qsIPRj9ulpMRFao2VTGt9GVWpKwSVFkDdPsXDjUkVC2-SlltvDdOKu3ZYd55pVOKErkXNJtZXpmSEqgkrYnViXpAmFfn8eISKteG4MJZKvGGt5-FuPxdsjxl14ItLECGBIw2tvV4u7aMV97S_U2k7gsxXu_868CP5DQu1LR-vA2HPsgFtM-3YrbJlG4sW_5Hbzh0G1J9WcVkrVtkxB19uJcDG1HI0cEwZy2gNkWpF-4ATfxIave1-urYS8QnwHPtU",
        },
      });
      res.json(response.data);
    } catch (error: any) {
      log(`Error fetching CVs: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to retrieve CVs", message: error.message });
    }
  });

  // Get CV by ID
  app.get("/api/cvs/:id", async (req: Request, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.get(`${apiUrl}/cvs/${req.params.id}`);

      res.json(response.data.cv);
    } catch (error: any) {
      log(`Error fetching CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to retrieve CV", message: error.message });
    }
  });

  // Create new CV
  app.post("/api/cvs", async (req: Request, res: Response) => {
    try {
      console.log("request", req.body);
      const apiUrl = getApiUrl();
      const response = await axios.post(`${apiUrl}/cvs`, {
        ...req.body,
      });
      res.json(response.data);
    } catch (error: any) {
      log(`Error creating CV: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to create CV", message: error.message });
    }
  });

  // Update CV
  app.put("/api/cvs/:id", async (req: Request, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.put(`${apiUrl}/cvs/${req.params.id}`, {
        ...req.body,
      });

      res.json(response.data);
    } catch (error: any) {
      log(`Error updating CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to update CV", message: error.message });
    }
  });

  // Delete CV
  app.delete("/api/cvs/:id", async (req: Request, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      await axios.delete(`${apiUrl}/cvs/${req.params.id}`);

      res.status(204).send();
    } catch (error: any) {
      log(`Error deleting CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to delete CV", message: error.message });
    }
  });

  // Duplicate CV
  app.post("/api/cvs/:id/duplicate", async (req: Request, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.post(
        `${apiUrl}/cvs/${req.params.id}/duplicate`,
      );

      res.status(201).json(response.data);
    } catch (error: any) {
      log(`Error duplicating CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to duplicate CV", message: error.message });
    }
  });

  app.get("/api/cvs/:id/download", async (req: Request, res: Response) => {
    try {
      const apiUrl = getApiUrl();
      const response = await axios.get(
        `${apiUrl}/cvs/${req.params.id}/download`,
        { responseType: "stream" },
      );

      res.setHeader("Content-Type", response.headers["content-type"]);
      if (response.headers["content-disposition"]) {
        res.setHeader(
          "Content-Disposition",
          response.headers["content-disposition"],
        );
      }

      response.data.pipe(res);
    } catch (error: any) {
      log(`Error downloading CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to download CV", message: error.message });
    }
  });

  // === AI Suggestion API Route ===

  // Get AI suggestion
  app.post("/api/ai-suggestions", async (req: Request, res: Response) => {
    try {
      const { section, additionalContext } = req.body;

      if (!section) {
        return res.status(400).json({ error: "Section is required" });
      }

      const suggestion = await storage.getAISuggestion(
        section,
        additionalContext,
      );
      res.json(suggestion);
    } catch (error: any) {
      log(
        `Error generating AI suggestion for ${req.body.section}: ${error.message}`,
        "api",
      );
      res.status(500).json({
        error: "Failed to generate AI suggestion",
        message: error.message,
      });
    }
  });

  // Example of how to set up an API proxy route
  // Uncomment and configure when you have the external API URL
  /*
    const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'https://api.example.com';

    // Jobs API - forward all requests to external API
    app.use('/api/jobs', createApiProxy(`${EXTERNAL_API_URL}/jobs`));

    // Authentication API
    app.use('/api/auth', createApiProxy(`${EXTERNAL_API_URL}/auth`));
    */

  const httpServer = createServer(app);
  return httpServer;
}
