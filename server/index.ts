import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create Express app
const app = express();

// Set up middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve files from the public folder

// Request logging middleware for API routes
app.use((req, res, next) => {
  // Only track API requests
  if (req.path.startsWith("/api")) {
    const start = Date.now();
    let capturedJsonResponse: Record<string, any> | undefined = undefined;
    
    // Capture JSON responses for logging
    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };
    
    // Log after response is sent
    res.on("finish", () => {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
      
      if (capturedJsonResponse) {
        // Add truncated response info
        const respStr = JSON.stringify(capturedJsonResponse);
        logLine += ` :: ${respStr.length > 50 ? respStr.slice(0, 49) + "…" : respStr}`;
      }
      
      log(logLine);
    });
  }
  
  next();
});

// Initialize server
(async () => {
  // Register API routes and get HTTP server
  const server = await registerRoutes(app);
  
  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    log(`Error: ${status} - ${message}`, "error");
    res.status(status).json({ message });
  });
  
  // Static file serving or Vite dev server
  if (app.get("env") === "development") {
    // Use Vite for development
    await setupVite(app, server);
  } else {
    // Serve static files for production
    serveStatic(app);
  }
  
  // Start server
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
  }, () => {
    log(`🚀 Server running on port ${port}`);
    log(`API endpoints available at /api/*`);
  });
})().catch(error => {
  log(`Failed to start server: ${error}`, "error");
  process.exit(1);
});
