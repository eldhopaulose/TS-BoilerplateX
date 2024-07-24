/**
 * RequiredError class, representing an error that occurs when required fields are missing.
 * @class
 */
export class RequiredError {
  /**
   * Creates a pretty object with error messages.
   * @param {ErrorObject[]} errors - An array of error objects.
   * @returns {Record<string, string>} - An object with field names as keys and error messages as values.
   */
  static makePretty(errors: ErrorObject[]): Record<string, string> {
    return errors.reduce((obj, error) => {
      const nObj = obj;
      nObj[error.field] = error.messages[0].replace(/"/g, "");
      return nObj;
    }, {} as Record<string, string>);
  }

  /**
   * Validates the required fields in an object.
   * @param {Record<string, any>} fields - The object to validate.
   * @param {string[]} requiredFields - An array of required field names.
   * @returns {ErrorObject[]} - An array of error objects.
   */
  static validateRequiredFields(
    fields: Record<string, any>,
    requiredFields: string[]
  ): ErrorObject[] {
    const errors: ErrorObject[] = [];

    requiredFields.forEach((field) => {
      if (!fields[field]) {
        errors.push({
          field,
          messages: [`${field} is required`],
        });
      }
    });

    return errors;
  }
}

/**
 * An error object representing a required field error.
 * @typedef {Object} ErrorObject
 * @property {string} field - The name of the field.
 * @property {string[]} messages - An array of error messages.
 */
export type ErrorObject = {
  field: string;
  messages: string[];
};
