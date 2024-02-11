import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller';
import ctrlWrapper from '../helpers/ctrlWrapper';
import { validateBody } from '../middleware/validateBody';
import { schemaSignUp } from '../models/user-model';

const userRoutes = express.Router();

userRoutes.route('/create').post(validateBody(schemaSignUp), ctrlWrapper(createUser));
userRoutes.route('/login').post(ctrlWrapper(loginUser));

export default userRoutes;
