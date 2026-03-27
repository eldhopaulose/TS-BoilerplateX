import rateLimit from "express-rate-limit";

/**
 * Global rate limiter to protect against brute-force and DDoS attacks.
 * Configurable via environment variables.
 */
export const globalRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 min default
  limit: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),             // 100 requests per window default
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too Many Requests",
    message: "You have exceeded the request limit. Please try again later.",
  },
});

/**
 * Stricter rate limiter for authentication/sensitive endpoints.
 */
export const strictRateLimiter = rateLimit({
  windowMs: parseInt(process.env.STRICT_RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 min
  limit: parseInt(process.env.STRICT_RATE_LIMIT_MAX || "10", 10),              // 10 requests per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too Many Requests",
    message: "Too many attempts. Please try again after some time.",
  },
});
