"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth-utils";
import { cookies } from "next/headers";


export async function createUser(formData:FormData){
    const email = formData.get("email") as string;
    const name = formData.get("name") as string
    const rawPassword = formData.get("password") as string;

    const hashedPassword = await hashPassword(rawPassword);

    await db.insert(users).values({
        name,
        email,
        passwordHash:hashedPassword,
    })

    return { success : true}
}

export async function loginUser(formData:FormData){
    const email = formData.get("email") as string;
    const password  = formData.get("password") as string

    try{
        const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email , email))
        .limit(1)

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return { error: "Invalid email or password" };
    }

    // Persist an HttpOnly session cookie so the server can verify auth
    // independently of the client-side Zustand/js-cookie state.
    const cookieStore = await cookies();
    cookieStore.set("seashore_session_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    };

    }catch(error){
        console.error("Login Error:", error);
    return { error: "Something went wrong. Please try again." };
    }
}