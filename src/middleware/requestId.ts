import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

/**
 * Middleware to attach a unique request ID to each incoming request.
 * The ID is sourced from the `X-Request-Id` header if present, or auto-generated.
 * It is also set on the response header for traceability.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const id = (req.headers["x-request-id"] as string) || uuidv4();

  // Attach to request for downstream use
  req.id = id;

  // Reflect in response headers for client correlation
  res.setHeader("X-Request-Id", id);

  next();
}
