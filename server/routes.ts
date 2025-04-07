import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { improveCvContent, suggestSkills } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI CV improvement endpoint
  app.post("/api/cv/improve", async (req: Request, res: Response) => {
    try {
      const content = req.body;
      const improved = await improveCvContent(content);
      res.json({ improved });
    } catch (error) {
      console.error("Error improving CV content:", error);
      res.status(500).json({ error: "Failed to improve CV content" });
    }
  });

  // AI skill suggestions endpoint
  app.post("/api/cv/suggest-skills", async (req: Request, res: Response) => {
    try {
      const { jobTitle } = req.body;
      if (!jobTitle) {
        return res.status(400).json({ error: "Job title is required" });
      }
      const skills = await suggestSkills(jobTitle);
      res.json({ skills });
    } catch (error) {
      console.error("Error suggesting skills:", error);
      res.status(500).json({ error: "Failed to suggest skills" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
