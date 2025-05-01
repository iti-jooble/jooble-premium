import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { log } from "./vite";
import { createApiProxy } from "./apiProxy";
import { getApiUrl } from "./helpers";
import { EXTERNAL_RESPONSE_TYPES } from "./constants";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Application initialization endpoint
  app.post(
    "/api/init",
    createApiProxy({ targetUrl: "/api/FitlyBaseApi/BaseInit" }),
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

  app.get(
    "/api/cvs/:id/download",
    createApiProxy({ responseType: EXTERNAL_RESPONSE_TYPES.FILE }),
  );

  const httpServer = createServer(app);
  return httpServer;
}
