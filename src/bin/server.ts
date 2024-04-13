import http from "http";
import { Application } from "express";

export function createServer(app: Application): http.Server {
  const port: string | number | boolean = normalizePort(
    process.env["PORT"] || "3000"
  );
  app.set("port", port);

  const server: http.Server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => onError(error, port));
  server.on("listening", () => onListening(server));

  return server;
}

function normalizePort(val: string): string | number | boolean {
  const portNumber: number = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  return false;
}

function onError(
  error: NodeJS.ErrnoException,
  port: string | number | boolean
): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind: string =
    typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(server: http.Server): void {
  const addr = server.address();
  const bind: string =
    typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
}
