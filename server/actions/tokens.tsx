"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailTokens, passwordResetTokens, users } from "../schema";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 10000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }
  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      expires,
      token,
    })
    .returning();
  return verificationToken;
};

export const verifyEmailToken = async (token: string) => {
  const existingEmailToken = await getVerificationTokenByEmail(token);
  if (!existingEmailToken) return { error: "Email token not found" };
  if (new Date(existingEmailToken.expires) < new Date())
    return { error: "Email token expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingEmailToken.email),
  });
  if (!existingUser) return { error: "Email does not exist" };

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingEmailToken.email,
  });

  await db.delete(emailTokens).where(eq(emailTokens.id, existingEmailToken.id));
  return { success: "Email Verified Successfully" };
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    }
    const passwordResetToken = await db
      .insert(passwordResetTokens)
      .values({
        email,
        expires,
        token,
      })
      .returning();
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
