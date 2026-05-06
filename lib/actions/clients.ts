"use server";

import { db } from "../db/client";
import { clients, projects } from "../db/schema";
import { ilike, or } from "drizzle-orm";

export async function getClientsWithProjects(searchQuery: string = "") {
  try {
    let condition = undefined;

    if (searchQuery) {
      condition = or(
        ilike(clients.name, `%${searchQuery}%`),
        ilike(clients.companyName, `%${searchQuery}%`),
        ilike(clients.phone, `%${searchQuery}%`)
      );
    }

    let query = db.select().from(clients).$dynamic();
    
    if (condition) {
      query = query.where(condition);
    }

    const fetchedClients = await query;

    if (fetchedClients.length === 0) return [];

    // Fetch all projects
    const allProjects = await db.select().from(projects);

    return fetchedClients.map((client) => ({
      ...client,
      projects: allProjects.filter((p) => p.clientId === client.id),
    }));
  } catch (error) {
    console.error("Failed to fetch clients with projects:", error);
    throw new Error("Failed to load clients. Please try again later.");
  }
}
