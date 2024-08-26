"use server";

import { newPasswordSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { getPasswordResetTokenByToken } from "./tokens";
import { db } from "..";
import { eq } from "drizzle-orm";
import { passwordResetTokens, users } from "../schema";
import bcrypt from "bcrypt";

export const safeActionClient = createSafeActionClient();

export const newPassword = safeActionClient(
  newPasswordSchema,
  async ({ password, token }) => {
    if (!token) return { error: "Missing token" };

    // Find Token from Database
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { error: "Token not found" };

    // Check if token has expired
    const expiredToken = new Date(existingToken.expires) < new Date();
    if (expiredToken) return { error: "Token has expired" };

    // Find User from Database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });
    if (!existingUser) return { error: "User not found" };

    // Update User Password in Database with hashing and Delete Old Token from Database
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    });
    return { success: "Password Updated Successfully" };
  }
);
