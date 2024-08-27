"use server";

import { resetSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generatePasswordResetToken } from "./tokens";
import { sendPasswordResetEmail } from "./email";

export const safeActionClient = createSafeActionClient();

export const passwordReset = safeActionClient(
  resetSchema,
  async ({ email }) => {
    // Check if user exists in Database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "User not found" };

    // Generate a password reset token for the user
    const passwordResetToken = await generatePasswordResetToken(email);
    if (!passwordResetToken) return { error: "Token not generated" };

    // Send the password reset email to the user
    await sendPasswordResetEmail(
      passwordResetToken[0].email,
      passwordResetToken[0].token
    );
    return { success: "Password reset email sent" };
  }
);
