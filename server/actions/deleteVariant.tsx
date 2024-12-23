"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { db } from "..";
import { eq } from "drizzle-orm";
import { productVariants } from "../schema";
import { revalidatePath } from "next/cache";
import algoliasearch from "algoliasearch";

export const safeActionClient = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
);

const algoliaIndex = client.initIndex("products");

export const deleteVariant = safeActionClient(
  z.object({ id: z.number() }),
  async ({ id }) => {
    try {
      const deleteVariant = await db
        .delete(productVariants)
        .where(eq(productVariants.id, id))
        .returning();
      revalidatePath("/dashboard/products");
      algoliaIndex.deleteObject(deleteVariant[0].id.toString());
      return { success: `Deleted ${deleteVariant[0].productType}` };
    } catch (error) {
      return { error: "Failed to delete Product Variant" };
    }
  }
);
