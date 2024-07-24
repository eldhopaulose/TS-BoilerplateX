/**
 * A base class for all custom errors in the application.
 * Extends the built-in Error class to provide additional properties and methods.
 */

export class ExtendableError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  status: number;
  isPublic: boolean;
  isOperational: boolean;

  /**
   * Whether the error message should be visible to the client.
   */
  constructor(message: string, status: number, isPublic: boolean) {
    /**
     * Whether the error is operational (i.e. not a programming error).
     */
    super(message);
    /**
     * Creates a new ExtendableError instance.
     * @param message - The error message.
     * @param status - The HTTP status code associated with the error.
     * @param isPublic - Whether the error message should be visible to the client.
     */
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
