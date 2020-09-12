require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/notFoundError');

Joi.objectId = require('joi-objectid')(Joi);

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/cards', celebrate({
  [Segments.QUERY]: Joi.object({
    path: Joi.objectId(),
  }),
}), cardsRouter);
app.use('/users', celebrate({
  [Segments.QUERY]: Joi.object({
    path: Joi.objectId(),
  }),
}), usersRouter);
app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Проверьте пожалуйста правильность введеных данных' });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  }
});

app.listen(PORT, () => {});
