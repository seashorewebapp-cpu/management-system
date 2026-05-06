"use server";

import { db } from "../db/client";
import { projects, payments, clients } from "../db/schema";
import { sql } from "drizzle-orm";

/**
 * Computes dashboard stats live from the DB:
 * - totalRevenue:    sum of all payments ever recorded
 * - totalOutstanding: sum of (totalBudget - advancePayment - sum of payments) across all non-completed projects
 * - recentPayments:  sum of payments made in the last 30 days
 */
export async function getDashboardStats() {
  const [revenue, outstanding, recent] = await Promise.all([
    // Total collected across all payments
    db
      .select({ total: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments),

    // Sum of remaining balances on non-completed projects
    db
      .select({
        total: sql<number>`
          COALESCE(SUM(
            COALESCE(${projects.totalBudget}, 0)
            - COALESCE(${projects.advancePayment}, 0)
            - COALESCE((
                SELECT SUM(p2.amount) FROM payments p2
                WHERE p2.project_id = ${projects.id}
              ), 0)
          ), 0)
        `,
      })
      .from(projects)
      .where(sql`${projects.status} != 'completed'`),

    // Payments in the last 30 days
    db
      .select({ total: sql<number>`COALESCE(SUM(${payments.amount}), 0)` })
      .from(payments)
      .where(
        sql`${payments.paymentDate} >= CURRENT_DATE - INTERVAL '30 days'`
      ),
  ]);

  return {
    totalRevenue: Number(revenue[0]?.total ?? 0),
    totalOutstanding: Number(outstanding[0]?.total ?? 0),
    recentPayments: Number(recent[0]?.total ?? 0),
  };
}

/**
 * Returns projects with remaining balance > 0 (outstanding dues),
 * joined with client name — used for the Outstanding Clients panel.
 */
export async function getOutstandingProjects(limit = 5) {
  return db
    .select({
      id: projects.id,
      projectName: projects.projectName,
      clientName: clients.name,
      remaining: sql<number>`
        COALESCE(${projects.totalBudget}, 0)
        - COALESCE(${projects.advancePayment}, 0)
        - COALESCE((
            SELECT SUM(p2.amount) FROM payments p2
            WHERE p2.project_id = ${projects.id}
          ), 0)
      `,
    })
    .from(projects)
    .innerJoin(clients, sql`${projects.clientId} = ${clients.id}`)
    .where(sql`${projects.status} != 'completed'`)
    .orderBy(sql`
      COALESCE(${projects.totalBudget}, 0)
      - COALESCE(${projects.advancePayment}, 0)
      - COALESCE((
          SELECT SUM(p2.amount) FROM payments p2
          WHERE p2.project_id = ${projects.id}
        ), 0) DESC
    `)
    .limit(limit);
}

/**
 * Returns the most recent active projects for the dashboard table.
 */
export async function getActiveProjectsForDashboard(limit = 5) {
  return db
    .select({
      id: projects.id,
      projectName: projects.projectName,
      clientName: clients.name,
      status: projects.status,
      totalBudget: projects.totalBudget,
    })
    .from(projects)
    .innerJoin(clients, sql`${projects.clientId} = ${clients.id}`)
    .where(sql`${projects.status} != 'completed'`)
    .orderBy(sql`${projects.createdAt} DESC`)
    .limit(limit);
}
