import { z } from "zod";

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) throw new Error("Error");
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  );

export const productsSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string()
    .min(40, { message: "Description must be at least 40 characters long" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  // image: z.string(),
});
