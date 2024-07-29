import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { createServer } from "./bin/server";

import indexRouter from "./routes/index";
import { errorHandler } from "./middlewares/errorHandler";
import { apiResponseMiddleware } from "./middlewares/apiResponseMiddleware ";

//initialize express app
const app = express();

// This line sets up Morgan middleware to log HTTP requests to the console using the "dev" format.
app.use(morgan("dev"));

// This line sets up bodyParser middleware to parse incoming JSON requests.
app.use(bodyParser.json());

// This line sets up bodyParser middleware to parse incoming URL-encoded requests with extended mode enabled.
app.use(bodyParser.urlencoded({ extended: true }));

// This line sets up compression middleware to compress HTTP responses before sending them to the client.
app.use(compression());

// This line sets up cookieParser middleware to parse cookies attached to incoming requests.
app.use(cookieParser());

// This line mounts the apiResponseMiddleware middleware at the end of the app.
app.use(apiResponseMiddleware);

// This line mounts the indexRouter at the root path of the app.
app.use("/", indexRouter);
// This line mounts the errorHandler middleware at the end of the app.
app.use(errorHandler);

createServer(app);
