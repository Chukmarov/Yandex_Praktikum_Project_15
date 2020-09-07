const router = require('express').Router(); // вызываем метод Router
const { createCard, getCards, deleteCard } = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardid', deleteCard);

module.exports = router;
