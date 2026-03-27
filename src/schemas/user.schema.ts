import { z } from "zod";

/**
 * Zod schemas for User API request validation.
 * These schemas validate body, query, and params for each endpoint.
 */

// ─── Create User ─────────────────────────────────────────────────────────────
export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ error: "Name must be a string" })
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    email: z
      .string({ error: "Email must be a string" })
      .email("Please provide a valid email address"),
    age: z
      .number({ error: "Age must be a number" })
      .int("Age must be a whole number")
      .min(1, "Age must be at least 1")
      .max(150, "Age must not exceed 150"),
    role: z
      .enum(["admin", "user", "moderator"], {
        error: "Role must be one of: admin, user, moderator",
      })
      .default("user"),
    isActive: z.boolean().default(true),
  }),
});

// ─── Update User ─────────────────────────────────────────────────────────────
export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .optional(),
    email: z
      .string()
      .email("Please provide a valid email address")
      .optional(),
    age: z
      .number()
      .int("Age must be a whole number")
      .min(1, "Age must be at least 1")
      .max(150, "Age must not exceed 150")
      .optional(),
    role: z.enum(["admin", "user", "moderator"]).optional(),
    isActive: z.boolean().optional(),
  }),
});

// ─── Get / Delete User by ID ─────────────────────────────────────────────────
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID format"),
  }),
});

// ─── List Users with Query Params ────────────────────────────────────────────
export const listUsersSchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1, "Page must be at least 1"))
      .optional(),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().int().min(1).max(100, "Limit must not exceed 100"))
      .optional(),
    role: z.enum(["admin", "user", "moderator"]).optional(),
    isActive: z
      .string()
      .transform((val) => val === "true")
      .optional(),
  }),
});

// ─── Export types inferred from schemas ──────────────────────────────────────
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
export type ListUsersQuery = z.infer<typeof listUsersSchema>["query"];
