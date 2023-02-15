import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации.'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'top-secret-phrase');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации.'));
    return;
  }

  req.user = payload;

  next();
};

export default checkAuth;
