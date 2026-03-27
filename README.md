<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Pino-687634?style=for-the-badge&logo=pino&logoColor=white" alt="Pino" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/ESLint_10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</p>

# TS-BoilerplateX

> 🚀 A production-ready, batteries-included TypeScript + Express.js boilerplate with modern tooling, structured logging, request validation, rate limiting, and more.

TS-BoilerplateX gives developers a **robust starting point** for building powerful REST APIs and web applications. It combines TypeScript's static typing with Express.js 5's flexibility, pre-configured with industry best practices for security, observability, and developer experience.

---

## ✨ Features

| Category | Feature | Details |
|---|---|---|
| 🏗️ **Core** | Express.js 5 | Latest version with improved routing & async error handling |
| 📝 **Language** | TypeScript 5.9+ | Strict mode, ES2022 target, full type safety |
| 🔒 **Security** | Helmet | Sets secure HTTP headers automatically |
| 🔒 **Security** | CORS | Configurable cross-origin resource sharing |
| 🔒 **Security** | Rate Limiting | Two-tier: global + strict (for auth endpoints) |
| 📊 **Logging** | Pino | Structured JSON logging (prod) / pretty print (dev) |
| 🆔 **Tracing** | Request ID | UUID-based request tracking via `X-Request-Id` header |
| ✅ **Validation** | Zod v4 | Schema-based request validation middleware |
| 💚 **Health** | Health Check | `/api/health` endpoint with uptime & memory stats |
| 🛡️ **Resilience** | Graceful Shutdown | Clean SIGTERM/SIGINT handling with connection draining |
| 🛡️ **Resilience** | Error Handling | Global error handler + uncaught exception/rejection capture |
| 🧹 **Linting** | ESLint 10 | Flat config with typescript-eslint |
| 📦 **Bundling** | esbuild | Lightning-fast production builds |
| 📖 **Docs** | TypeDoc | Auto-generated API documentation |
| 🔄 **DX** | Nodemon | Hot-reload during development |

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

---

## 🚀 Quick Start

### Using npx (Recommended)

```bash
npx ts-boilerplatex
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/eldhopaulose/TS-BoilerplateX.git
cd TS-BoilerplateX

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The server will start at `http://localhost:3000` with hot-reload enabled.

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment (`development` / `production`) |
| `LOG_LEVEL` | `debug` (dev) / `info` (prod) | Pino log level |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (ms) — 15 min |
| `RATE_LIMIT_MAX` | `100` | Max requests per window (global) |
| `STRICT_RATE_LIMIT_WINDOW_MS` | `900000` | Strict rate limit window (ms) |
| `STRICT_RATE_LIMIT_MAX` | `10` | Max requests per window (strict) |

---

## 📂 Project Structure

```
TS-BoilerplateX/
├── src/
│   ├── bin/
│   │   └── server.ts           # HTTP server creation & lifecycle
│   ├── controller/
│   │   └── indexController.ts   # Route handler logic
│   ├── middleware/
│   │   ├── index.ts             # Barrel export for all middleware
│   │   ├── rateLimiter.ts       # Global & strict rate limiters
│   │   ├── requestId.ts         # UUID-based request ID tracking
│   │   └── validate.ts          # Zod schema validation middleware
│   ├── routes/
│   │   ├── health.ts            # Health check endpoint
│   │   └── index.ts             # Application routes
│   ├── types/
│   │   └── express.d.ts         # Express type augmentations
│   ├── utils/
│   │   └── logger.ts            # Pino logger configuration
│   └── main.ts                  # Application entry point
├── .env.example                 # Environment variable template
├── eslint.config.mjs            # ESLint 10 flat config
├── nodemon.json                 # Development server config
├── package.json
├── tsconfig.json                # TypeScript compiler config
└── README.md
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon (hot-reload) |
| `npm run start` | Start with ts-node (no compilation needed) |
| `npm run production` | Run compiled JS from `dist/` |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run build-all` | Clean, compile, and bundle with esbuild |
| `npm run lint` | Run ESLint on source files |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run test` | Run tests with Jest |
| `npm run docs` | Generate API docs with TypeDoc |
| `npm run clean` | Remove build artifacts |

---

## 🔧 Advanced Features

### 📊 Structured Logging (Pino)

Pino provides ultra-fast, structured JSON logging in production and colorful, readable output in development.

```typescript
import logger from "./utils/logger";

logger.info("Server started");
logger.error({ err: error }, "Database connection failed");
logger.debug({ userId: 123 }, "User fetched");
```

**Development output:**
```
[12:34:56] INFO: Incoming request
    method: "GET"
    url: "/api/health"
    requestId: "550e8400-e29b-41d4-a716-446655440000"
```

**Production output (JSON):**
```json
{"level":"info","time":"2026-03-27T12:34:56.789Z","method":"GET","url":"/api/health","requestId":"550e8400-e29b-41d4-a716-446655440000","msg":"Incoming request"}
```

---

### ✅ Request Validation (Zod v4)

Type-safe request validation using Zod schemas:

```typescript
import { z } from "zod";
import { validate } from "../middleware/validate";

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    age: z.number().int().min(18, "Must be at least 18"),
  }),
});

router.post("/users", validate(createUserSchema), userController.create);
```

**Validation error response (422):**
```json
{
  "error": "Validation Error",
  "details": [
    { "field": "body.email", "message": "Invalid email address" },
    { "field": "body.age", "message": "Must be at least 18" }
  ]
}
```

---

### 🔒 Rate Limiting

Two-tier rate limiting out of the box:

```typescript
import { globalRateLimiter, strictRateLimiter } from "../middleware";

// Global: applied to all routes (100 req/15min by default)
app.use(globalRateLimiter);

// Strict: for sensitive endpoints (10 req/15min by default)
router.post("/auth/login", strictRateLimiter, authController.login);
```

---

### 🆔 Request ID Tracking

Every request gets a unique UUID via the `X-Request-Id` header. Pass an existing ID from upstream services, or one will be auto-generated:

```bash
# Auto-generated
curl http://localhost:3000/
# Response header: X-Request-Id: 550e8400-e29b-41d4-a716-446655440000

# Pass your own
curl -H "X-Request-Id: my-trace-id" http://localhost:3000/
# Response header: X-Request-Id: my-trace-id
```

---

### 💚 Health Check

Built-in health check endpoint for load balancers and container orchestration:

```bash
curl http://localhost:3000/api/health
```

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2026-03-27T12:34:56.789Z",
  "memoryUsage": {
    "rss": "45.23 MB",
    "heapUsed": "22.11 MB",
    "heapTotal": "35.50 MB"
  },
  "environment": "development"
}
```

---

### 🛡️ Graceful Shutdown

The server handles `SIGTERM` and `SIGINT` signals gracefully, allowing in-flight requests to complete before shutting down (with a 10-second timeout):

```typescript
// Automatically handled — no configuration needed
// Logs: "Received SIGTERM. Shutting down gracefully..."
// Logs: "HTTP server closed."
```

---

## 🔌 Middleware Stack

The following middleware is applied in order:

1. **Helmet** — Sets secure HTTP headers (XSS protection, CSP, etc.)
2. **CORS** — Enables cross-origin requests
3. **Rate Limiter** — Prevents abuse with configurable limits
4. **Request ID** — Assigns unique trace IDs to each request
5. **Pino Logger** — Logs every incoming request with method, URL, and trace ID
6. **Body Parser** — Parses JSON and URL-encoded bodies (up to 10MB)
7. **Compression** — Gzip compresses response bodies
8. **Cookie Parser** — Parses cookies from request headers

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Express.js | 5.x | Web framework |
| TypeScript | 5.9+ | Type-safe JavaScript |
| Pino | 10.x | Structured logging |
| Zod | 4.x | Schema validation |
| Helmet | 8.x | Security headers |
| express-rate-limit | 8.x | Rate limiting |
| ESLint | 10.x | Code linting |
| esbuild | 0.27+ | Fast bundling |
| TypeDoc | 0.28+ | API documentation |
| Nodemon | 3.x | Development hot-reload |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

### 🔗 [Resizo.in — Free Image Resizer · No Upload · No Sign-up · No Watermarks](https://www.resizo.in/)
https://www.resizo.in/
---

---

## 📄 License

Licensed under the Apache-2.0. See the [LICENSE](https://github.com/eldhopaulose/TS-BoilerplateX/blob/main/LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/eldhopaulose">Eldho Paulose</a>
</p>
