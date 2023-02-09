import * as dotenv from 'dotenv';
import { constants } from 'http2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ConflictError from '../errors/ConflctError.js';

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

export const createNewUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((createdUser) => {
          const createdUserSecured = createdUser.toObject();
          delete createdUserSecured.password;
          res.status(constants.HTTP_STATUS_CREATED).send(createdUserSecured);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные для создания нового пользователя.'));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
          } else {
            next(err);
          }
        });
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((loggedUser) => {
      const jwtToken = jwt.sign(
        { _id: loggedUser._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'top-secret-phrase',
        { expiresIn: '7d' },
      );

      res.send({ jwtToken });
    })
    .catch(next);
};

export const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId)
    .then((foundUser) => {
      if (!foundUser) {
        throw new NotFoundError('Пользователь с указанным id не найден.');
      }
      res.status(constants.HTTP_STATUS_OK).send({ foundUser });
    })
    .catch(next);
};

export const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate({ _id: userId }, { name, email }, { new: true, runValidators: true })
    .then((userUpdated) => {
      if (!userUpdated) {
        throw new NotFoundError('Пользователь с указанным id не найден.');
      }
      res.status(constants.HTTP_STATUS_OK).send({ userUpdated });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для обновления информации пользователя.'));
      } else {
        next(err);
      }
    });
};
