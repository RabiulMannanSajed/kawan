import express from 'express';
import { UserPredefineHabitController } from './userPredifineHabit.controller';

const route = express.Router();

route.post(
  '/create-userPredefineHabit',
  UserPredefineHabitController.createUserPredefineHabit,
);

route.get('/', UserPredefineHabitController.getAllUserPredefineHabit);

route.get('/:id', UserPredefineHabitController.getSingleUserPredefineHabit);

route.patch('/:id', UserPredefineHabitController.deleteUserPredefineHabit);

export const UserPredefineHabitRoute = route;
