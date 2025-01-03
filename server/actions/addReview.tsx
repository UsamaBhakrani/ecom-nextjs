"use server";

import { reviewsSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { reviews } from "../schema";
import { revalidatePath } from "next/cache";

export const safeActionClient = createSafeActionClient();

export const addReview = safeActionClient(
  reviewsSchema,
  async ({ productID, rating, comment }) => {
    try {
      const session = await auth();
      if (!session) return { error: "Please sign in" };

      const reviewExists = await db.query.reviews.findFirst({
        where: and(
          eq(reviews.productID, productID),
          eq(reviews.userID, session.user.id)
        ),
      });
      if (reviewExists) return { error: "Review already exists" };

      const newReview = await db
        .insert(reviews)
        .values({
          productID,
          rating,
          comment,
          userID: session.user.id,
        })
        .returning();
      revalidatePath(`/products/${productID}`);
      return { success: "Review Added Succesfully" };
    } catch (error) {
      return { error: "There was an error creating review" };
    }
  }
);
