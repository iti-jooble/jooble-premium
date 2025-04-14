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

export async function registerRoutes(app: Express): Promise<Server> {
  // === API Routes ===

  // Health check endpoint
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // === CV API Routes ===

  // Get all CVs
  app.get("/api/cvs", async (_, res: Response) => {
    try {
      const cvs = await storage.getAllCVs();
      res.json(cvs);
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
      const cv = await storage.getCVById(req.params.id);
      if (!cv) {
        return res.status(404).json({ error: "CV not found" });
      }
      res.json(cv);
    } catch (error: any) {
      log(`Error fetching CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to retrieve CV", message: error.message });
    }
  });

  // Create new CV
  app.post("/api/cvs", async (request: Request, res: Response) => {
    try {
      const newCV = await storage.createCV(request.body);
      res.status(201).json(newCV);
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
      const updatedCV = await storage.updateCV(req.params.id, req.body);
      if (!updatedCV) {
        return res.status(404).json({ error: "CV not found" });
      }

      res.json(updatedCV);
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
      const success = await storage.deleteCV(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "CV not found" });
      }

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
      const { title } = req.body;
      const duplicatedCV = await storage.duplicateCV(req.params.id, title);

      if (!duplicatedCV) {
        return res.status(404).json({ error: "Original CV not found" });
      }

      res.status(201).json(duplicatedCV);
    } catch (error: any) {
      log(`Error duplicating CV ${req.params.id}: ${error.message}`, "api");
      res
        .status(500)
        .json({ error: "Failed to duplicate CV", message: error.message });
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
