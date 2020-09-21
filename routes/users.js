const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userid', celebrate({
  [Segments.PARAMS]: Joi.object({
    userid: Joi.string().hex(),
  }),
}), getUserById);

module.exports = router;
