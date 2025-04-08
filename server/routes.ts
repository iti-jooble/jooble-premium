import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { log } from "./vite";

/**
 * Creates a proxy middleware to forward requests to an external API
 * @param targetUrl The base URL of the external API
 */
const createApiProxy = (targetUrl: string) => {
  return async (req: Request, res: Response) => {
    const url = `${targetUrl}${req.url.replace(/^\/api/, '')}`;
    
    try {
      log(`Proxying request to: ${url}`, 'proxy');
      
      // Forward the request to the external API
      const response = await axios({
        method: req.method,
        url,
        data: req.body,
        headers: {
          // Forward relevant headers, but exclude ones related to the Express server
          ...Object.entries(req.headers)
            .filter(([key]) => !['host', 'connection'].includes(key.toLowerCase()))
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
          // Add API key if needed
          ...(process.env.EXTERNAL_API_KEY && { 'x-api-key': process.env.EXTERNAL_API_KEY })
        },
        // Forward query parameters
        params: req.query,
        // Support for binary responses
        responseType: 'arraybuffer'
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
        const data = error.response?.data || { message: 'External API error' };
        
        log(`API Proxy error: ${status} - ${JSON.stringify(data)}`, 'proxy');
        res.status(status).json(data);
      } else {
        // Handle general error
        log(`Proxy error: ${error}`, 'proxy');
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // === API Routes ===
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Example of how to set up an API proxy route
  // Uncomment and configure when you have the external API URL
  /*
  const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'https://api.example.com';
  
  // Jobs API - forward all requests to external API
  app.use('/api/jobs', createApiProxy(`${EXTERNAL_API_URL}/jobs`));
  
  // CVs API
  app.use('/api/cvs', createApiProxy(`${EXTERNAL_API_URL}/cvs`));
  
  // Authentication API
  app.use('/api/auth', createApiProxy(`${EXTERNAL_API_URL}/auth`));
  */

  const httpServer = createServer(app);
  return httpServer;
}
