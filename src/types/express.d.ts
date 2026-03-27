import "express";

declare global {
  namespace Express {
    interface Request {
      /** Unique request identifier for distributed tracing */
      id: string;
    }
  }
}
