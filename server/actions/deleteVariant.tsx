"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { eq } from "drizzle-orm";
import { productVariants } from "../schema";
import { revalidatePath } from "next/cache";

export const safeActionClient = createSafeActionClient();

export const deleteVariant = safeActionClient(
  z.object({ id: z.number() }),
  async ({ id }) => {
    console.log(id);
  }
);
