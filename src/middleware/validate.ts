import { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * Express middleware factory for Zod-based request validation.
 * Validates body, query, and/or params against provided Zod schemas.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 * import { validate } from "../middleware/validate";
 *
 * const createUserSchema = z.object({
 *   body: z.object({
 *     name: z.string().min(1),
 *     email: z.string().email(),
 *   }),
 * });
 *
 * router.post("/users", validate(createUserSchema), userController.create);
 * ```
 */
export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(422).json({
        error: "Validation Error",
        details: formattedErrors,
      });
      return;
    }

    next();
  };
}
