import express from 'express';
import {
  createNewUser, login,
} from '../controllers/users.js';
import { signUpDataValidation, signInDataValidation } from '../utils/validation.js';

const rootRoutes = express.Router();

rootRoutes.get('/', (req, res) => {
  res.send('Server is being developed');
});
rootRoutes.post('/signup', signUpDataValidation, createNewUser);
rootRoutes.post('/signin', signInDataValidation, login);

export default rootRoutes;
