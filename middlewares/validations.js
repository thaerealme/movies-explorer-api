const { celebrate, Joi } = require('celebrate');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/[www]*[a-z0-9-._~:/?#\\@!$&'()*+,;=]+[.ru]*/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/[www]*[a-z0-9-._~:/?#\\@!$&'()*+,;=]+[.ru]*/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/[www]*[a-z0-9-._~:/?#\\@!$&'()*+,;=]+[.ru]*/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateRegister,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
