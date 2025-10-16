import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLocationRequestSchema,
  insertCriticApplicationSchema,
  insertAdvertiserApplicationSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Location Requests Routes (위치 신청)
  app.post("/api/location-requests", async (req, res) => {
    try {
      const validatedData = insertLocationRequestSchema.parse(req.body);
      const request = await storage.createLocationRequest(validatedData);
      res.json(request);
    } catch (error: any) {
      console.error("Error creating location request:", error);
      res.status(400).json({ error: error.message || "Invalid request data" });
    }
  });

  app.get("/api/location-requests", async (req, res) => {
    try {
      const requests = await storage.getAllLocationRequests();
      res.json(requests);
    } catch (error: any) {
      console.error("Error fetching location requests:", error);
      res.status(500).json({ error: "Failed to fetch location requests" });
    }
  });

  // Critic Applications Routes (미식가 신청)
  app.post("/api/critic-applications", async (req, res) => {
    try {
      const validatedData = insertCriticApplicationSchema.parse(req.body);
      const application = await storage.createCriticApplication(validatedData);
      res.json(application);
    } catch (error: any) {
      console.error("Error creating critic application:", error);
      res.status(400).json({ error: error.message || "Invalid request data" });
    }
  });

  app.get("/api/critic-applications", async (req, res) => {
    try {
      const applications = await storage.getAllCriticApplications();
      res.json(applications);
    } catch (error: any) {
      console.error("Error fetching critic applications:", error);
      res.status(500).json({ error: "Failed to fetch critic applications" });
    }
  });

  // Advertiser Applications Routes (광고주 신청)
  app.post("/api/advertiser-applications", async (req, res) => {
    try {
      const validatedData = insertAdvertiserApplicationSchema.parse(req.body);
      const application = await storage.createAdvertiserApplication(validatedData);
      res.json(application);
    } catch (error: any) {
      console.error("Error creating advertiser application:", error);
      res.status(400).json({ error: error.message || "Invalid request data" });
    }
  });

  app.get("/api/advertiser-applications", async (req, res) => {
    try {
      const applications = await storage.getAllAdvertiserApplications();
      res.json(applications);
    } catch (error: any) {
      console.error("Error fetching advertiser applications:", error);
      res.status(500).json({ error: "Failed to fetch advertiser applications" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
