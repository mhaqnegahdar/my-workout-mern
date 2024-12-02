import z from "zod";

export const userZod = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Pasword is required",
    invalid_type_error: "Pasword must be a string",
  }),
});

export type UserSchemaType = z.infer<typeof userZod>;

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(32, "Password must not exceed 32 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/\d/, "Password must contain at least one number.")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character.");


  