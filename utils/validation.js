import { celebrate, Joi } from 'celebrate';

export const urlValidator = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]{1,}#?/;

export const signUpDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signInDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const profileUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

export const newMovieDataValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(new RegExp(urlValidator)).required(),
    trailerLink: Joi.string().pattern(new RegExp(urlValidator)).required(),
    thumbnail: Joi.string().pattern(new RegExp(urlValidator)).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

export const movieIdValidator = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
