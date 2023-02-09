import express from 'express';
import {
  getCurrentUser, updateUserInfo,
} from '../controllers/users.js';
import { profileUpdateValidation } from '../utils/validation.js';

const usersRoutes = express.Router();

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', profileUpdateValidation, updateUserInfo);

export default usersRoutes;
