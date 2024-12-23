"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import {
  productVariants,
  products,
  variantImages,
  variantTags,
} from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { variantSchema } from "@/types/dashboardTypes";
import algoliasearch from "algoliasearch";

const safeActionClient = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
);

const algoliaIndex = client.initIndex("products");

export const createVariant = safeActionClient(
  variantSchema,
  async ({
    color,
    editMode,
    id,
    productID,
    productType,
    tags,
    variantImages: newImgs,
    price,
  }) => {
    try {
      if (editMode && id) {
        const editVariant = await db
          .update(productVariants)
          .set({ color, productType, updated_at: new Date() })
          .where(eq(productVariants.id, id))
          .returning();
        await db
          .delete(variantTags)
          .where(eq(variantTags.variantID, editVariant[0].id));
        await db.insert(variantTags).values(
          tags.map((tag: any) => ({
            tag,
            variantID: editVariant[0].id,
          }))
        );
        await db
          .delete(variantImages)
          .where(eq(variantImages.variantID, editVariant[0].id));
        await db.insert(variantImages).values(
          newImgs.map((img: any, idx: any) => ({
            name: img.name,
            size: img.size,
            url: img.url,
            variantID: editVariant[0].id,
            order: idx,
          }))
        );

        // Algolia indexing
        await algoliaIndex.saveObject({
          objectID: editVariant[0].id.toString(),
          id: editVariant[0].productID,
          productType: editVariant[0].productType,
          variantImages: newImgs[0].url,
        });

        revalidatePath("/dashboard/products");
        return { success: `Edited ${productType}` };
      }

      if (!editMode) {
        const newVariant = await db
          .insert(productVariants)
          .values({
            price,
            color,
            productType,
            productID,
          })
          .returning();

        const product = await db.query.products.findFirst({
          where: eq(products.id, productID),
        });

        await db.insert(variantTags).values(
          tags.map((tag: any) => ({
            tag,
            variantID: newVariant[0].id,
          }))
        );

        await db.insert(variantImages).values(
          newImgs.map((img: any, idx: any) => ({
            name: img.name,
            size: img.size,
            url: img.url,
            variantID: newVariant[0].id,
            order: idx,
          }))
        );

        // Algolia Index
        if (product) {
          await algoliaIndex.saveObject({
            objectID: newVariant[0].id.toString(),
            id: newVariant[0].productID,
            title: product.title,
            price: product.price,
            productType: newVariant[0].productType,
            variantImages: newImgs[0].url,
          });
        }

        revalidatePath("/dashboard/products");
        return { success: `Added ${productType}` };
      }
    } catch (error) {
      return { error: "Failed to create variant" };
    }
  }
);
