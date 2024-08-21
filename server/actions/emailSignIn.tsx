"use server";

import { loginFormSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";

export const safeActionClient = createSafeActionClient();

export const emailSignIn = safeActionClient(
  loginFormSchema,
  async ({ email, password, code }) => {
    
  }
);
