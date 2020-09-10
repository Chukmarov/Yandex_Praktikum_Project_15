const Card = require('../models/card');
const { NotFoundError, RightsError} = require('../errors/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link, likes } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => { next(err) })
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardid)
    .orFail(new NotFoundError('Данная карточка отсутсвует в базе'))
    .then((card) => {
      if (!(req.user._id === card.owner.toString())) {
        throw new RightsError('Невозможно удалять карточки других пользователей');
      }
      return card;
    })
    .then((card) => Card.findByIdAndRemove(card._id))
    .then((card) => res.send({ data: card }))
    .catch((err) => { next(err) });
};
