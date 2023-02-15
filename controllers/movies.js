import { constants } from 'http2';
import Movie from '../models/movie.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

export const addNewMovie = (req, res, next) => {
  const movieOwner = req.user._id;

  Movie.create({ ...req.body, owner: movieOwner })
    .then((addedMovie) => {
      res.status(constants.HTTP_STATUS_CREATED).send(addedMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для добавления нового фильма.'));
      } else {
        next(err);
      }
    });
};

export const getUserMovies = (req, res, next) => {
  const movieOwner = req.user._id;

  Movie.find({ owner: movieOwner })
    .then((userMovies) => {
      res.status(constants.HTTP_STATUS_OK).send(userMovies);
    })
    .catch(next);
};

export const deleteMovie = (req, res, next) => {
  const id = req.params.movieId;

  Movie.findById(id)
    .then((movieToDelete) => {
      if (!movieToDelete) {
        throw new NotFoundError('Фильм с указанным id не найден.');
      } else if (movieToDelete.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Доступ запрещен.');
      } else {
        Movie.findByIdAndRemove(id)
          .then((deletedMovie) => {
            res.status(constants.HTTP_STATUS_OK).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id фильма.'));
      } else {
        next(err);
      }
    });
};
