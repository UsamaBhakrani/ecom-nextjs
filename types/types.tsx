import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please input a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  code: z.optional(z.string()),
});

export const registerFormSchema = z.object({
  email: z.string().email({ message: "Please input a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  name: z
    .string()
    .min(4, { message: "Please add a name with atleast 4 characters" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  token: z.string().nullable().optional(),
});

export const resetSchema = z.object({
  email: z.string().email({ message: "Please input a valid email address" }),
});

export const reviewsSchema = z.object({
  productID: z.number(),
  comment: z
    .string()
    .min(10, { message: "comment must be at least 10 characters long" }),
  rating: z
    .number()
    .min(1)
    .max(5, { message: "Rating must be between 1 and 5" }),
});

export const paymentIntentSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  cart: z.array(
    z.object({
      title: z.string(),
      price: z.number(),
      quantity: z.number(),
      image: z.string(),
      productID: z.number(),
    })
  ),
});

export const createOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  paymentIntentID: z.string(),
  products: z.array(
    z.object({
      productID: z.number(),
      variantID: z.number(),
      quantity: z.number(),
    })
  ),
});
