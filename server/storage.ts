// Reference: blueprint:javascript_database
import { 
  locationRequests, 
  criticApplications,
  advertiserApplications,
  users,
  type LocationRequest,
  type InsertLocationRequest,
  type CriticApplication,
  type InsertCriticApplication,
  type AdvertiserApplication,
  type InsertAdvertiserApplication,
  type User,
  type InsertUser 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Location Requests
  createLocationRequest(data: InsertLocationRequest): Promise<LocationRequest>;
  getAllLocationRequests(): Promise<LocationRequest[]>;
  
  // Critic Applications
  createCriticApplication(data: InsertCriticApplication): Promise<CriticApplication>;
  getAllCriticApplications(): Promise<CriticApplication[]>;
  
  // Advertiser Applications
  createAdvertiserApplication(data: InsertAdvertiserApplication): Promise<AdvertiserApplication>;
  getAllAdvertiserApplications(): Promise<AdvertiserApplication[]>;
  
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // Location Requests
  async createLocationRequest(data: InsertLocationRequest): Promise<LocationRequest> {
    const [request] = await db
      .insert(locationRequests)
      .values(data)
      .returning();
    return request;
  }

  async getAllLocationRequests(): Promise<LocationRequest[]> {
    return await db
      .select()
      .from(locationRequests)
      .orderBy(desc(locationRequests.createdAt));
  }

  // Critic Applications
  async createCriticApplication(data: InsertCriticApplication): Promise<CriticApplication> {
    const [application] = await db
      .insert(criticApplications)
      .values(data)
      .returning();
    return application;
  }

  async getAllCriticApplications(): Promise<CriticApplication[]> {
    return await db
      .select()
      .from(criticApplications)
      .orderBy(desc(criticApplications.createdAt));
  }

  // Advertiser Applications
  async createAdvertiserApplication(data: InsertAdvertiserApplication): Promise<AdvertiserApplication> {
    const [application] = await db
      .insert(advertiserApplications)
      .values(data)
      .returning();
    return application;
  }

  async getAllAdvertiserApplications(): Promise<AdvertiserApplication[]> {
    return await db
      .select()
      .from(advertiserApplications)
      .orderBy(desc(advertiserApplications.createdAt));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
