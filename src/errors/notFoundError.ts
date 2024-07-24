/**
 * @class NotFoundError
 * @extends {ExtendableError}
 */
import httpStatus from "http-status";
import { ExtendableError } from "./extendableError";

export class NotFoundError extends ExtendableError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} [message='Resource not found'] - The error message.
   * @param {boolean} [isPublic=true] - Whether the error message should be visible to the client.
   * @memberof NotFoundError
   */
  constructor(
    message: string = "Resource not found",
    isPublic: boolean = true
  ) {
    super(message, httpStatus.NOT_FOUND, isPublic);
  }
}
