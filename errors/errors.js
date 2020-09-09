class ExistError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 409;
      this.name = 'ExistError';
  }
}

class MissingFieldError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 400;
      this.name = 'MissingFieldError';
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
      super(message);
      this.statusCode = 404;
      this.name = 'UserNotFoundError';
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

module.exports = { ExistError, MissingFieldError, UserNotFoundError, NeedAuthorizationError, NotFoundError };