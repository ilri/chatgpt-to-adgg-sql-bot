const customResponse = require("./globalResponse").customResponse;

/**
 * Genearate Custom Error When Something went wrong
 */
exports.customError = {
  badRequest: 400,
  notAuthorized: 401,
  Forbidden: 403,
  resourceNotFound: 404,
  authenticationError: 401,
  internalServerError: 500,
  ServiceUnavailable: 503,
  errorHandler: (type, message) => {
    customResponse.data = {};
    customResponse.error = {
      error: type,
      errorDescription: message,
    };
    customResponse.isSuccess = false;
    return customResponse;
  },
};
