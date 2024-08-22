"use server";

import { loginFormSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export const safeActionClient = createSafeActionClient();

export const emailSignIn = safeActionClient(
  loginFormSchema,
  async ({ email, password, code }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "User not found" };
    // if(!existingUser.emailVerified) return { error: "Please verify your email"}

    return { success: email };
  }
);
