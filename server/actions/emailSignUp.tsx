"use server";

import { registerFormSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt";

export const safeActionClient = createSafeActionClient();

export const emailSignUp = safeActionClient(
  registerFormSchema,
  async ({ email, password, code }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser) return { error: "User already Registered. Please login" };
    // if(!existingUser.emailVerified) return { error: "Please verify your email"}

    return { success: "Yayyy" };
  }
);
