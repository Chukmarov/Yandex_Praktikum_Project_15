const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthorizationTroubleError } = require('../errors/errors');

module.exports.login = (req, res, next) => {

  const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
      })
    .catch(() => {
      next(new AuthorizationTroubleError('Возникли проблемы авторизации. Проверьте, пожалуйста, корректность введенных данных.'))
    });
};
