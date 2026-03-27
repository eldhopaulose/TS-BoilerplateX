import { Router, Request, Response } from "express";

const router = Router();

/**
 * Health check endpoint for load balancers, Kubernetes probes, and monitoring.
 * Returns basic service health info including uptime and memory usage.
 */
router.get("/health", (_req: Request, res: Response) => {
  const healthcheck = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memoryUsage: {
      rss: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
    },
    environment: process.env.NODE_ENV || "development",
  };

  res.status(200).json(healthcheck);
});

export default router;
