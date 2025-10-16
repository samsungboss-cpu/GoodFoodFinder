import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Location Requests Table (위치 신청)
export const locationRequests = pgTable("location_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLocationRequestSchema = createInsertSchema(locationRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertLocationRequest = z.infer<typeof insertLocationRequestSchema>;
export type LocationRequest = typeof locationRequests.$inferSelect;

// Food Critic Applications Table (미식가 신청)
export const criticApplications = pgTable("critic_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCriticApplicationSchema = createInsertSchema(criticApplications).omit({
  id: true,
  createdAt: true,
});

export type InsertCriticApplication = z.infer<typeof insertCriticApplicationSchema>;
export type CriticApplication = typeof criticApplications.$inferSelect;

// Advertiser Applications Table (광고주 신청)
export const advertiserApplications = pgTable("advertiser_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  representative: text("representative").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdvertiserApplicationSchema = createInsertSchema(advertiserApplications).omit({
  id: true,
  createdAt: true,
});

export type InsertAdvertiserApplication = z.infer<typeof insertAdvertiserApplicationSchema>;
export type AdvertiserApplication = typeof advertiserApplications.$inferSelect;

// Admin Users Table (관리자)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
