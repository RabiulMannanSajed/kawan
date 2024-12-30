import express from 'express';
import { UserControllers } from './user.controller';

const route = express.Router();

route.post('/create-user', UserControllers.createUser);

route.get('/', UserControllers.getAllUser);

route.patch('/:id', UserControllers.updateUser);

export const UserRouters = route;
