import type { Express } from "express";
import { createServer, type Server } from "http";
import { createApiProxy } from "./apiProxy";
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

  // === User API Routes ===

  // Update user preferences
  app.put("/api/user/preferences", createApiProxy());

  const httpServer = createServer(app);
  return httpServer;
}
