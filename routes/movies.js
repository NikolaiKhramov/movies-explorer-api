import express from 'express';
import {
  addNewMovie, getUserMovies, deleteMovie,
} from '../controllers/movies.js';
import { newMovieDataValidation, movieIdValidator } from '../utils/validation.js';

const movieRoutes = express.Router();

movieRoutes.get('/', getUserMovies);
movieRoutes.post('/', newMovieDataValidation, addNewMovie);
movieRoutes.delete('/:movieId', movieIdValidator, deleteMovie);

export default movieRoutes;
