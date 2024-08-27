"use server";

import { registerFormSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

export const safeActionClient = createSafeActionClient();

export const emailSignUp = safeActionClient(
  registerFormSchema,
  async ({ email, password, name }) => {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already signed up
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);

        // Send verification email here
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );

        return { success: "Verification email resent successfully" };
      }
      return { error: "Email Already in use" };
    }
    // Create a new user
    await db.insert(users).values({ email, name });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token
    );

    return { success: "User registered successfully. Verification email sent" };
  }
);
