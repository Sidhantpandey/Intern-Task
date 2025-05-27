class ApiError extends Error {
  constructor(type, message, fields = null, statusCode = 400) {
    super(message);
    this.type = type;
    this.message = message;
    this.fields = fields;
    this.statusCode = statusCode;
  }
  static validationError(message, validationArray) {
    const fieldErrors = {};

    for (const error of validationArray) {
      const field = error.param || error.path; // fallback support
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(error.msg);
    }

    return new ApiError("validation", message, fieldErrors, 422);
  }

  static customFieldError(message, field, fieldMsg) {
    return new ApiError("validation", message, { [field]: [fieldMsg] }, 422);
  }

  static error(message = "Internal Server Error", statusCode = 500) {
    return new ApiError("server", message, statusCode);
  }
}

export default ApiError;
