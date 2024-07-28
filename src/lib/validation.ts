import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores and hyphens",
  ),
  password: requiredString.min(8, "Must be atleast 8 character"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores and hyphens",
  ),
  password: requiredString.min(8, "Must be atleast 8 character"),
});

export type LoginValues = z.infer<typeof loginSchema>;
