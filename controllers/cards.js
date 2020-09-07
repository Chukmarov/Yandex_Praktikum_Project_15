const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Проверьте пожалуйста правильность введеных данных' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardid)
    .orFail()
    .then((card) => {
      if (!(req.user._id === card.owner.toString())) {
        const err = new Error('Невозможно удалять карточки других пользователей');
        err.name = 'RightsError';
        return Promise.reject(err);
      }
      return card;
    })
    .then((card) => Card.findByIdAndRemove(card._id))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Пожалуйста проверьте правильность запроса и корретность введенных данных' });
      } else if (err.name === 'RightsError') {
        res.status(403).send({ message: err.message });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка не найдена, либо была ранее удалена' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
