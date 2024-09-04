"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";
import { revalidatePath } from "next/cache";

export const safeActionClient = createSafeActionClient();

export const deleteProduct = safeActionClient(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const product = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

        revalidatePath("/dashboard/products");
      return { success: `Product ${product[0].title} deleted successfully` };
    } catch (error) {
      return { error: "Failed to delete product" };
    }
  }
);
