"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server action to clear the HttpOnly session cookie and redirect to login.
 * Call this from a <form action={logoutAction}> button so it works
 * without JavaScript too.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("seashore_session_id");
  redirect("/auth/login");
}
