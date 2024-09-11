"use server";

import { variantSchema } from "@/types/dashboardTypes";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { productVariants, variantImages } from "../schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const safeActionClient = createSafeActionClient();

export const createVariant = safeActionClient(
  variantSchema,
  async ({
    editMode,
    id,
    color,
    productType,
    variantTags,
    tags,
    variantImages: newImages,
    productID,
  }) => {
    try {
      // Update Variant Color and Product Type
      if (editMode && id) {
        const editVariant = await db
          .update(productVariants)
          .set({ color, productType, updated_at: new Date() })
          .returning();

        // Delete existing variant tags and insert new ones
        await db
          .delete(variantTags)
          .where(eq(variantTags.variantID, editVariant[0].id));
        await db.insert(variantTags).values(
          tags.map((tag: { tag: string; variantID: number }) => ({
            tag,
            variantID: editVariant[0].id,
          }))
        );

        // Delete existing variant Images and insert new ones
        await db
          .delete(variantImages)
          .where(eq(variantImages.variantID, editVariant[0].id));
        await db.insert(variantImages).values(
          newImages.map((img: any, index: number) => ({
            name: img.name,
            size: img.size,
            url: img.url,
            variantID: editVariant[0].id,
            order: index,
          }))
        );
        revalidatePath("/dashboard/products");
        return {
          success: `${productType} updated successfully`,
        };
      }

      // Insert new Variant Color and Product Type
      if (!editMode) {
        const newVariant = await db
          .insert(productVariants)
          .values({
            color,
            productType,
            productID,
          })
          .returning();

        // Insert new variant tags
        await db.insert(variantTags).values(
          tags.map((tag: any) => ({
            tag,
            variantID: newVariant[0].id,
          }))
        );
      }
    } catch (error) {}
  }
);
