import express from 'express';
import rootRoutes from './rootRoutes.js';
import usersRoutes from './users.js';
import movieRoutes from './movies.js';
import checkAuth from '../middlewares/auth.js';
import NotFoundError from '../errors/NotFoundError.js';

const routes = express.Router();

routes.use('/', rootRoutes);
routes.use('/users', checkAuth, usersRoutes);
routes.use('/movies', checkAuth, movieRoutes);
routes.use('/*', checkAuth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует.'));
});

export default routes;
