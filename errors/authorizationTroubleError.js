class AuthorizationTroubleError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'NeedAuthorizationError';
  }
}

module.exports = { AuthorizationTroubleError };
