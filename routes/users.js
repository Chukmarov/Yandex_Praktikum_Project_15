const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');
const {
  celebrate, Joi, Segments,
} = require('celebrate');

router.get('/', getUsers);

router.get('/:userid',celebrate({
  [Segments.PARAMS]: Joi.object({
    userid: Joi.string().hex(),
  }),
}), getUserById);

module.exports = router;
