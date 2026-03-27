import dotenv from "dotenv";
dotenv.config();

import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import { createServer } from "./bin/server";
import { requestId, globalRateLimiter } from "./middleware";
import logger from "./utils/logger";

import indexRouter from "./routes/index";
import healthRouter from "./routes/health";
import userRouter from "./routes/user.routes";

// ─── Initialize Express App ─────────────────────────────────────────────────
const app = express();

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(globalRateLimiter);

// ─── Request Tracing ─────────────────────────────────────────────────────────
app.use(requestId);

// ─── Structured Logging (Pino) ───────────────────────────────────────────────
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.url, requestId: req.id }, "Incoming request");
  next();
});

// ─── Body Parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Compression & Cookies ───────────────────────────────────────────────────
app.use(compression());
app.use(cookieParser());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/", indexRouter);
app.use("/api", healthRouter);
app.use("/api/users", userRouter);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Not Found" });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error & { status?: number }, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({ err, requestId: _req.id }, "Unhandled error");

    res.status((err as Error & { status?: number }).status || 500).json({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  },
);

// ─── Start Server with Graceful Shutdown ─────────────────────────────────────
const server = createServer(app);

function gracefulShutdown(signal: string): void {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal({ err: reason }, "Unhandled Rejection");
  process.exit(1);
});
