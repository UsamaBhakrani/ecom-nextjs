"use server";

import { paymentIntentSchema } from "@/types/types";
import { createSafeActionClient } from "next-safe-action";
import Stripe from "stripe";
import { auth } from "../auth";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const safeActionClient = createSafeActionClient();

export const createPaymentIntent = safeActionClient(
  paymentIntentSchema,
  async ({ amount, cart, currency }) => {
    try {
      const user = await auth();
      if (!user) return { error: "Login to Checkout" };
      if (!amount) return { error: "No Product Selected" };

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          cart: JSON.stringify(cart),
        },
        automatic_payment_methods: { enabled: true },
      });
      return {
        success: {
          paymentIntentID: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          user: user.user.email,
        },
      };
    } catch (error) {
      return;
    }
  }
);
