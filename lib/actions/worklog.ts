"use server";

import { db } from "../db/client";
import { dailyLogs, payments, projects, users } from "../db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

function formatDateToISO(dateStr: string) {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
}

export async function createDailyLog(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const rawDate = formData.get("logDate") as string;
  const description = formData.get("description") as string;

  if (!projectId ||  !rawDate) {
    throw new Error("Missing required fields");
  }

  const formattedDate = formatDateToISO(rawDate);

  const cookieStore = await cookies();
  const currentUserId = cookieStore.get("seashore_session_id")?.value;

  if (!currentUserId) {
    throw new Error("Unauthorized: Please sign in to log work.");
  }

  await db.insert(dailyLogs).values({
    projectId,
    createdBy: currentUserId,
    logDate: formattedDate, 
    description,
  });

  revalidatePath(`/projects/${projectId}`);
}



export async function updateStatus(formData:FormData){
        const projectId = formData.get("projectId") as string;
        const status = formData.get("status")as
        |"pending"
        |"in_progress"
        |"completed"
        "on_hold";

         if (!projectId || !status) {
    throw new Error("Missing fields");
  }


  await db.update(projects)
  .set({
    status,
    updatedAt:new Date()
  })
  .where(eq(projects.id,projectId));

   revalidatePath(`/projects/${projectId}`);
 }



export async function addPayments(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const amount = formData.get("amount") as string;
  const note = formData.get("note") as string;

  if (!projectId || !amount) {
    throw new Error("Missing required fields");
  }

  const today = new Date().toISOString().split("T")[0];

  await db.insert(payments).values({
    projectId,
    amount,
    paymentDate: today, // ✅ correct
    notes: note,
  });

  revalidatePath(`/projects/${projectId}`);
}

export async function updatePayment(formData: FormData) {
  const paymentId = formData.get("paymentId") as string;
  const projectId = formData.get("projectId") as string;
  const amount = formData.get("amount") as string;
  const note = formData.get("note") as string;

  if (!paymentId || !projectId || !amount) {
    throw new Error("Missing required fields");
  }

  await db.update(payments)
    .set({
      amount,
      notes: note,
    })
    .where(eq(payments.id, paymentId));

  revalidatePath(`/projects/${projectId}`);
}