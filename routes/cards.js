const router = require('express').Router(); // вызываем метод Router
const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { createCard, getCards, deleteCard } = require('../controllers/cards');

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    link: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/),
    name: Joi.string().required(),
  }),
}), createCard);
router.get('/', getCards);
router.delete('/:cardid', celebrate({
  [Segments.PARAMS]: Joi.object({
    cardid: Joi.string().hex(),
  }),
}), deleteCard);

module.exports = router;
