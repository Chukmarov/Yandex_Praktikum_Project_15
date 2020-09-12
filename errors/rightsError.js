class RightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'RightsError';
  }
}

module.exports = { RightsError };
