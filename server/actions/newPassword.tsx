"use server";

import { newPasswordSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";

export const safeActionClient = createSafeActionClient();

export const newPassword = safeActionClient(
  newPasswordSchema,
  async ({ password, token }) => {
    if (!token) return { error: "Missing token" };
  }
);
