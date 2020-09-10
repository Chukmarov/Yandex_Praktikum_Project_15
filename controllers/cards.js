const Card = require('../models/card');
const { NotFoundError, ExistError, NotCorrectResponse, RightsError} = require('../errors/errors');

module.exports.createCard = (req, res, next) => {
  const { name, link, likes } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => { next(err) })
//       if (err.name === 'ValidationError') {
//         res.status(400).send({ message: 'Проверьте пожалуйста правильность введеных данных' });
//       } else {
//         next(err);
//       }
//     });
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
        // const err = new Error('Невозможно удалять карточки других пользователей');
        // err.name = 'RightsError';
        // return Promise.reject(err);
      }
      return card;
    })
    .then((card) => Card.findByIdAndRemove(card._id))
    .then((card) => res.send({ data: card }))
    .catch((err) => { next(err) });
    //   if (err.name === 'CastError') {
    //     res.status(400).send({ message: 'Пожалуйста проверьте правильность запроса и корретность введенных данных' });
    //   } else if (err.name === 'RightsError') {
    //     res.status(403).send({ message: err.message });
    //   } else if (err.name === 'DocumentNotFoundError') {
    //     res.status(404).send({ message: 'Карточка не найдена, либо была ранее удалена' });
    //   } else {
    //     next(err);
    //   }
    // });
};
