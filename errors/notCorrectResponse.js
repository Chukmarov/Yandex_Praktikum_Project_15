class NotCorrectResponse extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = 'NotCorrectResponse';
  }
}

module.exports = { NotCorrectResponse };
