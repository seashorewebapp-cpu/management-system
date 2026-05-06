import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  decimal, 
  date, 
  pgEnum 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for Project Status
export const projectStatusEnum = pgEnum("project_status", [
  "pending", 
  "in_progress", 
  "completed", 
  "on_hold"
]);

/* ================= USERS ================= */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================= CLIENTS ================= */
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================= PROJECTS ================= */
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id).notNull(),
  createdBy: uuid("created_by").references(() => users.id).notNull(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  siteLocation: text("site_location"),
  totalBudget: decimal("total_budget", { precision: 12, scale: 2 }),
  advancePayment: decimal("advance_payment", { precision: 12, scale: 2 }),
  status: projectStatusEnum("status").default("pending"),
  startDate: date("start_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================= PAYMENTS ================= */
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  paymentDate: date("payment_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================= DAILY LOGS ================= */
export const dailyLogs = pgTable("daily_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  createdBy: uuid("created_by").references(() => users.id).notNull(),
  logDate: date("log_date").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ================= DASHBOARD STATS ================= */
export const dashboardStats = pgTable("dashboard_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  totalRevenue: decimal("total_revenue", { precision: 15, scale: 2 }).default("0"),
  totalOutstanding: decimal("total_outstanding", { precision: 15, scale: 2 }).default("0"),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});