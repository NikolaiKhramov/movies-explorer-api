import { constants } from 'http2';

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message,
  } = err;

  res.status(statusCode).send({
    message: statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? 'Непредвиденная ошибка на сервере.'
      : message,
  });
  next();
};

export default errorHandler;
