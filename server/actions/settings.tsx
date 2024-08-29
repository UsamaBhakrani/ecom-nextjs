"use server";

import { settingsSchema } from "@/types/dashboardTypes";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const safeActionClient = createSafeActionClient();

export const settings = safeActionClient(settingsSchema, async (values) => {
  // Check if user is authenticated
  const user = await auth();
  if (!user) return { error: "User not found" };

  // Find user in the database
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.user.id),
  });
  if (!dbUser) return { error: "User not found" };

  // Check if OAuth is enabled
  if (user.user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Check users Db Password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) return { error: "Incorrect password" };

    // Check if new password is the same as the old one
    const samePassword = await bcrypt.compare(
      values.newPassword,
      dbUser.password!
    );
    if (samePassword)
      return { error: "New password is the same as old password" };

    // Hash the new password before storing it in the database
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Update user object in the database with new password
  const updatedUser = await db
    .update(users)
    .set({
      name: values.name,
      password: values.password,
      twoFactorEnabled: values.isTwoFactorEnabled,
      email: values.email,
      image: values.image,
    })
    .where(eq(users.id, dbUser.id));
  revalidatePath("/dashboard/settings");
  return { success: "Settings updated successfully" };
});
