import colors from "colors";

/**
 * A utility class for logging errors.
 */
export class Logger {
  // Define the available colors
  private static availableColors = {
    blue: colors.blue,
    green: colors.green,
    cyan: colors.cyan,
    yellow: colors.yellow,
    red: colors.red,
    bgBlue: colors.bgBlue,
    bgGreen: colors.bgGreen,
    bgCyan: colors.bgCyan,
    bgYellow: colors.bgYellow,
    bgRed: colors.bgRed,
  };

  // Mapping of status code categories to color functions
  private static statusCodeCategoryColors: {
    [category: string]: (text: string) => string;
  } = {
    "1xx": Logger.availableColors.blue, // Informational
    "2xx": Logger.availableColors.green, // Success
    "3xx": Logger.availableColors.cyan, // Redirection
    "4xx": Logger.availableColors.yellow, // Client Error
    "5xx": Logger.availableColors.red, // Server Error
  };

  // Mapping of status code categories to background color functions
  private static statusCodeCategoryBgColors: {
    [category: string]: (text: string) => string;
  } = {
    "1xx": Logger.availableColors.bgBlue, // Informational
    "2xx": Logger.availableColors.bgGreen, // Success
    "3xx": Logger.availableColors.bgCyan, // Redirection
    "4xx": Logger.availableColors.bgYellow, // Client Error
    "5xx": Logger.availableColors.bgRed, // Server Error
  };

  /**
   * Logs the details of an error to the console.
   * @param {Error & { status?: number }} error - The error object to log.
   */
  static logError(error: Error & { status?: number }) {
    const timestamp = new Date().toISOString();
    let statusMessage: string;
    let logMessage: string;

    if (error.status) {
      // Determine the status code category (1xx, 2xx, 3xx, 4xx, 5xx)
      const statusCodeCategory = `${Math.floor(error.status / 100)}xx`;
      const colorFunction =
        this.statusCodeCategoryColors[statusCodeCategory] ||
        Logger.availableColors.red; // Default to red if category is not in the mapping
      const bgColorFunction =
        this.statusCodeCategoryBgColors[statusCodeCategory] ||
        Logger.availableColors.bgRed; // Default to bgRed if category is not in the mapping
      statusMessage = colorFunction(`Status Code: ${error.status}`);
      logMessage = bgColorFunction(
        colors.white(`[${timestamp}] ${error.name}: ${error.message}`)
      );
    } else {
      statusMessage = colors.yellow("No status code"); // Change color as needed
      logMessage = colors.bgYellow(
        colors.black(`[${timestamp}] ${error.name}: ${error.message}`)
      ); // Change color as needed
    }

    console.error(logMessage);
    console.error(`Details: ${statusMessage}`);

    if (error.stack) {
      console.error(colors.gray(`Stack trace:\n${error.stack}`)); // Change color as needed
    }
  }
}
