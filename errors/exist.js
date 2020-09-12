class ExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'ExistError';
  }
}

module.exports = { ExistError };
