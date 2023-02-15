import mongoose from 'mongoose';
import { urlValidator } from '../utils/validation.js';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlValidator.test(url),
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlValidator.test(url),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlValidator.test(url),
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

export default mongoose.model('movie', movieSchema);
