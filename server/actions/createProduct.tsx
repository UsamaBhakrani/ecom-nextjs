"use server";

import { productsSchema } from "@/types/dashboardTypes";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { products } from "../schema";
import { revalidatePath } from "next/cache";

export const safeActionClient = createSafeActionClient();

export const createProduct = safeActionClient(
  productsSchema,
  async ({ id, title, description, price }) => {
    try {
      // Check if the product is already in the Db
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });

        // If Product not found return error message
        if (!currentProduct) return { error: "Product not found" };

        // If Product found in Db, update the product
        const editedProduct = await db
          .update(products)
          .set({ description, price, title })
          .where(eq(products.id, id))
          .returning();
        revalidatePath("/dashboard/products");
        return {
          success: `Product ${editedProduct[0].title} updated successfully`,
        };
      }

      // If Product not found in Db, create a new product
      if (!id) {
        const newProduct = await db
          .insert(products)
          .values({
            description,
            price,
            title,
          })
          .returning();
        revalidatePath("/dashboard/products");
        return { success: `Product ${newProduct[0].title} added successfully` };
      }
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
);
