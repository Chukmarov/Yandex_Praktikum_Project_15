class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'UserNotFoundError';
  }
}

module.exports = { NotFoundError };
