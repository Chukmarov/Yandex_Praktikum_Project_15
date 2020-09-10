const jwt = require('jsonwebtoken');
const { AuthorizationTroubleError } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new AuthorizationTroubleError ('Необходима авторизация')
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthorizationTroubleError ('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
