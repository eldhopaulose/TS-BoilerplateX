/**
 * Global error handler middleware.
 * Logs the error and sends an appropriate response to the client.
 *
 * @param err - The error object.
 * @param _req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
import { Request, Response, NextFunction } from 'express';
import { ExtendableError } from '../errors/extendableError';
import { Logger } from '../utils/logger'; 
import { ValidationError } from '../errors';

export function errorHandler(err: ExtendableError, _req: Request, res: Response, next: NextFunction) {
  /**
   * If the environment is development, log the error to the console.
   * Otherwise, log the error message, name, and status to the console.
   */

  if (process.env.NODE_ENV === 'development') {
    Logger.logError(err);
  } else {

    Logger.logError({
      message: err.message,
      name: err.name,
      status: err.status
    });
  }

  /**
   * Set the status code to the error status code, or 500 if not available.
   * Set the response message to the error message if it's public, otherwise set it to 'Internal Server Error'.
   */

  const statusCode = err.status || 500;
  const message = err.isPublic ? err.message : 'Internal Server Error';

  /**
   * Send the response to the client.
   * If the error is a validation error, include the errors array.
   */

  res.status(statusCode).json({
    status: statusCode,
    message,
    ...(err instanceof ValidationError && { errors: err.errors })
 
  });

  /**
   * Call the next middleware function.
   */

  next();
}

