const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError, ExistError, NotCorrectResponse} = require('../errors/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ExistError('Данный пользователь уже зарегистрирован в базе, пожалуйста авторизируйтесь.');
      }
      if (req.body.password === undefined || req.body.password === '') {
        throw new NotCorrectResponse('Вы пропустили поле password. Пожалуйста, попробуйте снова.');
      }
      return (bcrypt.hash(req.body.password, 10));
    })
    .then((password) => {
        const user = User.create({
          name, about, avatar, email, password,
        });
        return user;
     })
    .then(() => User.findOne({ email }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {next(err)})
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserById = async (req, res, next) => {
 await User.findById(req.params.userid)
    .orFail(new NotFoundError('Этот пользователь отсутсвует в базе'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {next(err)});
};
