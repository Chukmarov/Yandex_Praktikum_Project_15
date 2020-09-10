class ExistError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 409;
      this.name = 'ExistError';
  }
}

class NotCorrectResponse extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 400;
      this.name = 'NotCorrectResponse';
  }
}

class NeedAuthorizationError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 401;
      this.name = 'NeedAuthorizationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 404;
      this.name = 'UserNotFoundError';
  }
}

class RightsError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 403;
      this.name = 'RightsError';
  }
}

module.exports = { ExistError, NotCorrectResponse, NeedAuthorizationError, NotFoundError, RightsError };