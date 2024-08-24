"use server";

import { loginFormSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

export const safeActionClient = createSafeActionClient();

export const emailSignIn = safeActionClient(
  loginFormSchema,
  async ({ email, password, code }) => {
    try {
      // Check if user already signed up
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      // Return error if user is not signed up
      if (existingUser?.email !== email) return { error: "User not found" };

      // Check if user has verified their email
      if (!existingUser?.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser?.email!
        );

        // Send verification email here
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return { success: "Confirmation Email Sent" };
      }

      await signIn("credentials", { email, password, redirectTo: "/" });
      return { success: "User Signed In" };
      
    } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  }
);
