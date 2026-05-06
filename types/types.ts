/* ================= COMMON ================= */
export type UUID = string;

/* ================= USERS ================= */
export interface User {
  id: UUID;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

/* Safe user (never expose password) */
export type SafeUser = Omit<User, "password_hash">;

/* Create / Update */
export type CreateUser = Omit<User, "id" | "created_at" | "updated_at">;
export type UpdateUser = Partial<CreateUser>;

/* ================= CLIENTS ================= */
export interface Client {
  id: UUID;
  name: string;
  company_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateClient = Omit<Client, "id" | "created_at" | "updated_at">;
export type UpdateClient = Partial<CreateClient>;

/* ================= PROJECTS ================= */
export type ProjectStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "on_hold";

export interface Project {
  id: UUID;

  client_id: UUID;
  created_by: UUID;

  project_name: string;
  site_location?: string;

  total_budget: number;
  advance_payment: number;

  status: ProjectStatus;

  start_date?: string; // YYYY-MM-DD

  created_at: Date;
  updated_at: Date;
}

export type CreateProject = Omit<Project, "id" | "created_at" | "updated_at">;
export type UpdateProject = Partial<CreateProject>;

/* ================= PAYMENTS ================= */
export interface Payment {
  id: UUID;

  project_id: UUID;

  amount: number;
  payment_date: string; // YYYY-MM-DD
  notes?: string;

  created_at: Date;
  updated_at: Date;
}

export type CreatePayment = Omit<Payment, "id" | "created_at" | "updated_at">;
export type UpdatePayment = Partial<CreatePayment>;

/* ================= DAILY LOGS ================= */
export interface DailyLog {
  id: UUID;

  project_id: UUID;
  created_by: UUID;

  log_date: string; // YYYY-MM-DD
  description: string;

  created_at: Date;
  updated_at: Date;
}

export type CreateDailyLog = Omit<DailyLog, "id" | "created_at" | "updated_at">;
export type UpdateDailyLog = Partial<CreateDailyLog>;

/* ================= DASHBOARD ================= */
export interface DashboardStats {
  id: UUID;

  total_revenue: number;
  total_outstanding: number;

  last_updated: Date;
}

export type UpdateDashboardStats = Partial<
  Omit<DashboardStats, "id">
>;

/* ================= DERIVED / VIEW TYPES ================= */

/* Project with financial calculations */
export interface ProjectWithFinancials extends Project {
  total_paid: number;
  remaining: number;
}

/* Project with client info (for joins) */
export interface ProjectWithClient extends Project {
  client: Client;
}

/* Full project view (most useful in UI) */
export interface ProjectFull extends Project {
  client: Client;
  total_paid: number;
  remaining: number;
}