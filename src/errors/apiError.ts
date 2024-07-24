/**
 * APIError class, representing an error that occurs during the API communication.
 * @extends ExtendableError
 */
import httpStatus from "http-status";
import { ExtendableError } from "./extendableError";

export class APIError extends ExtendableError {
  /**
   * Creates an instance of APIError.
   * @param {string} message - The error message.
   * @param {number} [status=httpStatus.INTERNAL_SERVER_ERROR] - The error status code.
   * @param {boolean} [isPublic=false] - Whether the error message should be visible to the client.
   */
  constructor(
    message: string,
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic: boolean = false
  ) {
    super(message, status, isPublic);
  }
}
export default APIError;
