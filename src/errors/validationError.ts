import httpStatus from "http-status";
import { ExtendableError } from "./extendableError";

/**
 * An error object representing a validation error.
 * @typedef {Object} ErrorObject
 * @property {string} field - The name of the field.
 * @property {string[]} messages - An array of error messages.
 */
interface ErrorObject {
  field: string;
  messages: string[];
}

export class ValidationError extends ExtendableError {
  errors: ErrorObject[];

  constructor(
    message: string = "Validation failed",
    errors: ErrorObject[] = [],
    isPublic: boolean = true
  ) {
    /**
     * An array of error messages.
     */
    super(message, httpStatus.BAD_REQUEST, isPublic);
    /**
     * ValidationError class, representing an error that occurs during validation.
     * This error is used to indicate that some fields are invalid.
     * It is used in conjunction with the validation middleware.
     * @class
     */
    this.errors = errors;
    /**
     * An array of error objects, each representing an invalid field.
     */
  }
}
/**
 * Creates a new ValidationError instance.
 * @param {string} [message="Validation failed"] - The error message.
 * @param {ErrorObject[]} [errors=[]] - An array of error objects.
 * @param {boolean} [isPublic=true] - Whether the error message should be visible to the client.
 */

export { ErrorObject };
