"use server"
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { db } from "../db/client";
import { clients, projects, payments, dailyLogs, users } from "../db/schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


export async function createProject(formData: FormData) {
  const projectName = formData.get("projectName") as string
  const companyName = formData.get("companyName") as string
  const client = formData.get("clientName") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const phone = formData.get("phoneNumber") as string
  const totalBudget = formData.get("totalBudget") as string;
  const advancePayment = formData.get("advancePayment") as string;

  const cookieStore = await cookies();
  const currentUserId = cookieStore.get("seashore_session_id")?.value;

  if (!currentUserId) {
    return { success: false, message: "Unauthorized: Please sign in to create projects." };
  }

  try {
    //step 1 
    const [newClient] = await db.insert(clients).values({
      name: client,
      companyName,
      email,
      phone,
      location
    }).returning({ id: clients.id })

    // STEP B: Create the Project linked to that Client
    const [newProject] = await db.insert(projects).values({
      projectName,
      clientId: newClient.id,
      createdBy: currentUserId,
      totalBudget: totalBudget || "0",
      advancePayment: advancePayment || "0",
      status: "pending",
    }).returning({ id: projects.id });


    // STEP C: Record the Advance Payment in the Payments table
    if (advancePayment && parseFloat(advancePayment) > 0) {
      await db.insert(payments).values({
        projectId: newProject.id,
        amount: advancePayment,
        paymentDate: new Date().toISOString().split('T')[0], // Today's date
        notes: "Initial advance payment for project startup",
      });
    }
    revalidatePath("/projects");
    return { success: true, projectId: newProject.id };
  } catch (error) {
    console.error("Create Project Error:", error);
    return { success: false, message: "Could not create project and payment record." };
  }
}



export async function getAllProjects(page: number = 1, pageSize: number = 10) {
  const offset = (page - 1) * pageSize;

  // Base where/join conditions reused for both queries
  const baseQuery = db
    .select({
      projectId: projects.id,
      projectName: projects.projectName,
      clientName: clients.name,
      location: projects.siteLocation,
      totalBudget: projects.totalBudget,
      totalPaid: sql<number>`COALESCE(SUM(${payments.amount}), 0)`,
      remaining: sql<number>`
        COALESCE(${projects.totalBudget}, 0)
        - COALESCE(${projects.advancePayment}, 0)
        - COALESCE(SUM(${payments.amount}), 0)
      `,
    })
    .from(projects)
    .innerJoin(clients, sql`${projects.clientId} = ${clients.id}`)
    .leftJoin(payments, sql`${projects.id} = ${payments.projectId}`)
    .groupBy(
      projects.id,
      clients.name,
      projects.projectName,
      projects.siteLocation,
      projects.totalBudget,
      projects.advancePayment
    );

  // Count query — counts distinct project rows before grouping
  const countQuery = db
    .select({ count: sql<number>`COUNT(DISTINCT ${projects.id})` })
    .from(projects)
    .innerJoin(clients, sql`${projects.clientId} = ${clients.id}`);

  const [data, countResult] = await Promise.all([
    baseQuery.limit(pageSize).offset(offset),
    countQuery,
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      hasNextPage: page < Math.ceil(total / pageSize),
      hasPrevPage: page > 1,
    },
  };
}
export async function getProjectById(projectId: string) {
  const result = await db
    .select({
      id: projects.id,
      projectName: projects.projectName,
      location: projects.siteLocation,
      status: projects.status,
      clientName: clients.name,
      totalBudget: projects.totalBudget,
      advancePayment: projects.advancePayment,
      totalPaid: sql<number>`COALESCE(SUM(${payments.amount}), 0)`,
      remaining: sql<number>`
        COALESCE(${projects.totalBudget}, 0)
        - COALESCE(${projects.advancePayment}, 0)
        - COALESCE(SUM(${payments.amount}), 0)
      `,
    })
    .from(projects)
    .innerJoin(clients, eq(projects.clientId, clients.id))
    .leftJoin(payments, eq(projects.id, payments.projectId))
    .where(eq(projects.id, projectId))
    .groupBy(
      projects.id,
      clients.name,
      projects.projectName,
      projects.siteLocation,
      projects.status,
      projects.totalBudget,
      projects.advancePayment
    );
  return result[0] ?? null;
}

export async function getProjectLogs(projectId: string) {
  return db
    .select({
      id: dailyLogs.id,
      logDate: dailyLogs.logDate,
      description: dailyLogs.description,
      createdBy: users.name,
    })
    .from(dailyLogs)
    .innerJoin(users, eq(dailyLogs.createdBy, users.id))
    .where(eq(dailyLogs.projectId, projectId))
    .orderBy(sql`${dailyLogs.logDate} DESC`);
}

export async function getProjectPayments(projectId: string) {
  return db
    .select({
      id: payments.id,
      amount: payments.amount,
      paymentDate: payments.paymentDate,
      notes: payments.notes,
    })
    .from(payments)
    .where(eq(payments.projectId, projectId))
    .orderBy(sql`${payments.paymentDate} DESC`);
}