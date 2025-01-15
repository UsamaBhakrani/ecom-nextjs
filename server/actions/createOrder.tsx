"use server";

import { createOrderSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";

const safeActionClient = createSafeActionClient();

export const createOrder = safeActionClient(
  createOrderSchema,
  async ({ products, status, total, paymentIntentID }) => {
    try {
      const user = await auth();
      if (!user) return { error: "User not found" };

      const order = await db
        .insert(orders)
        .values({
          total,
          status,
          paymentIntentID,
          userID: user.user.id,
        })
        .returning();

      // Create order products
      const orderProducts = products.map(
        async ({
          productID,
          quantity,
          variantID,
        }: {
          productID: number;
          quantity: number;
          variantID: number;
        }) => {
          const newOrderProduct = await db.insert(orderProduct).values({
            quantity,
            productID,
            orderID: order[0].id,
            productVariantID: variantID,
          });
        }
      );
      return { success: "Order has been added successfully" };
    } catch (error) {
      return { error: "Error creating order" };
    }
  }
);
