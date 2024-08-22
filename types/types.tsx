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
